/*
    plugin:
        rbac_jwt:

*/
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

function RoleRepo() {
    /**
        Get permission by role id
        @params {string id} 
        @return {RoleId, Name, PermissionId, Service, Operator}
    */
    async function GetPermissionByRoleId(id) {
        const request = new sql.Request();
        const rolePermissions = await request
            .input('role_id', sql.NVarChar, id)
            .query(`select r.Id as RoleId, r.Name, po.*
                    from Roles r join PermissionRole pr on r.Id = pr.RolesId
                    join (  select p.Id as PermissionId,
                            p.Service, o.Operator
                            from Permissions p, Operations o where p.OperationId = o.Id
                        ) 
                    as po on po.PermissionId = pr.PermissionsId
                    where r.Id = @role_id`);

        return rolePermissions.recordset;
    }

    return {
        GetPermissionByRoleId
    }
}

function UserRepo() {
    /**
        Get user by user id
        @params {string} id
    */
    async function GetUserById(id) {
        const request = new sql.Request();
        const user = await request
            .input('user_id', sql.NVarChar, id)
            .query('select * from users where id = @user_id');
        return user.recordset[0];
    }

    return {
        GetUserById
    }
}

class RbacJwtPlugin {
    constructor(config) {
        this.config = config;
    }

    async access(kong) {
        try {
            this.kong = kong;
            const jwkConfig = {
                jwksUri: this.config.jwk_stored_url,
                Cache: true,
                timeout: 30000 // Defaults to 30s
            }
            const sqlConfig = {
                server: this.config.rbac_server,
                database: this.config.rbac_database,
                user: this.config.rbac_database_user,
                password: this.config.rbac_database_password,
                options: {
                    encrypt: false,
                    trustedConnection: false,
                    trustServerCertificate: true,
                }
            }
            // connect to database
            try {
                await sql.connect(sqlConfig);
                kong.log.warn("login to sql server successfully!");
            } catch (err) {
                throw err;
            }

            var roleRepo = RoleRepo();
            var userRepo = UserRepo();

            let authHeader = await kong.request.getHeader("Authorization");
            // Check token is attached on header or not
            if (authHeader == null) {
                return await kong.response.exit(401, { message: "cannot found authorization header" });
            }

            const token = authHeader.split(' ')[1];

            // decode header 
            const { header } = jwt.decode(token, { complete: true });
            kong.log.warn(`Token header extraction: ${JSON.stringify(header)}`);
            const { kid, alg, cty } = header;
            // check token alg
            if (alg !== "RS256" || cty !== "JWT") {
                return await kong.response.exit(401, { message: "wrong algorithm for sign that token" });
            }
            // get public key from keyId
            const client = jwks(jwkConfig);
            const key = await client.getSigningKey(kid);
            const publicKey = key.getPublicKey();
            kong.log.warn(`Public key has extracted from ${key} is ${publicKey}`);
            // verify token
            const decode = jwt.decode(token, publicKey);
            kong.log.warn(`Token decoded ${JSON.stringify(decode)}`);
            // check token expiration time
            const {
                id,
                roles,
                exp
            } = decode;
            if (new Date(exp) < new Date()) {
                return await kong.response.exit(401, { message: "Token is valid" });
            }
            // get warnrmation
            const user = await userRepo.GetUserById(id);
            if (user == null) {
                return await kong.response.exit(401, { message: "Token is wrong" });
            }
            kong.log.warn(`User: ${JSON.stringify(user)}`);

            const rolePermission = await Promise.all(JSON.parse(roles).map((role) => {
                return roleRepo.GetPermissionByRoleId(role.Id);
            }));

            kong.log.warn(`Role permissions: ${JSON.stringify(rolePermission)}`);

            // filter data
            const router = await kong.request.getPath();
            kong.log.warn(`route: ${router}`);

            const _roles = [];
            const _operators = [];
            for (let i = 0; i < rolePermission.length; i++) {
                let roleFilter = rolePermission[i]
                    .filter(rp => rp.Service.toLowerCase().includes(router.toLowerCase()));
                _roles.push(...new Set(roleFilter.map(r => r.Name)));
                _operators.push(...new Set(roleFilter.map(r => r.Operator)));
            }

            // attach token warnrmation into enrich header
            await Promise.all([
                kong.service.request.setHeader("X-USER-ID", user.Id),
                kong.service.request.setHeader("X-AUTHENTICATED", true),
                kong.service.request.setHeader("X-ROLES-NAME", JSON.stringify(_roles)),
                kong.service.request.setHeader("X-OPERATORS-METHOD", JSON.stringify(_operators))
            ])

            kong.log.warn("verify token successfully!");
        } catch (err) {
            this.kong.log.err(err.message);
            return await this.kong.response.exit(500, { message: err.message });
        }
    }
}


module.exports = {
    Plugin: RbacJwtPlugin,
    // pass environment of database and jwk stored in here
    Schema: [
        { jwk_stored_url: { type: "string" } },
        { rbac_server: { type: "string" } },
        { rbac_database: { type: "string" } },
        { rbac_database_user: { type: "string" } },
        { rbac_database_password: { type: "string" } }
    ],
    Version: "0.1.0"
};
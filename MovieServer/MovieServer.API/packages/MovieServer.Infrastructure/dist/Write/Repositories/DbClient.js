"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWriteDatabaseClient = void 0;
const sequelize_1 = require("sequelize");
const Models_1 = require("../Models");
const domain_1 = require("@movie/domain");
const tedious = __importStar(require("tedious"));
async function GetWriteDatabaseClient({ database, host, username, password, port }) {
    // initial sequelize instance
    const config = {
        // dialect: 'mssql',
        username: username,
        password: password,
        database: database,
        port: port,
        host: host,
        dialectModule: tedious,
    };
    const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                trustedConnection: false,
                trustServerCertificate: true
            }
        },
        define: {
            timestamps: false
        },
        ...config
    });
    //init movie model
    Models_1.MovieModel.init({
        Id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            set(value) {
                this.setDataValue("Id", value.Guid);
            },
            get() {
                const value = this.getDataValue("Id");
                return domain_1.MovieId.Create(value);
            }
        },
        Status: {
            type: sequelize_1.DataTypes.STRING,
            set(value) {
                this.setDataValue("Status", value.Status);
            },
            get() {
                const value = this.getDataValue("Status");
                return domain_1.MovieStatus.Create(value);
            }
        },
        Name: {
            type: sequelize_1.DataTypes.STRING,
            set(value) {
                this.setDataValue("Name", value.Name);
            },
            get() {
                const value = this.getDataValue("Name");
                return domain_1.MovieName.Create(value);
            }
        },
        Slot: {
            type: sequelize_1.DataTypes.INTEGER,
            set(value) {
                this.setDataValue("Slot", value.Slot);
            },
            get() {
                const value = this.getDataValue("Slot");
                return domain_1.MovieSlot.Create(value);
            }
        },
        Price: {
            type: sequelize_1.DataTypes.FLOAT,
            set(value) {
                this.setDataValue("Price", value.Price);
            },
            get() {
                const value = this.getDataValue("Price");
                return domain_1.MoviePrice.Create(value);
            }
        },
        Localization: {
            type: sequelize_1.DataTypes.STRING,
            set(value) {
                this.setDataValue("Localization", `${value.District},${value.City}`);
            },
            get() {
                const value = this.getDataValue("Localization");
                const [District, City] = value.split(",");
                return domain_1.Localization.Create(District, City);
            }
        }
    }, {
        sequelize,
        tableName: "Movie"
    });
    // init actor model
    Models_1.ActorModel.init({
        Id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        Name: {
            type: sequelize_1.DataTypes.STRING
        },
        Role: {
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: "Actor"
    });
    // set constrain
    Models_1.MovieModel.hasMany(Models_1.ActorModel, {
        sourceKey: "Id",
        foreignKey: "MovieId",
        as: "Actors"
    });
    return new Promise((res, rej) => {
        sequelize.sync()
            .then(() => {
            console.log('connect to write side database successfully');
            res(sequelize);
        })
            .catch(err => {
            console.log('fail to connect to write side database');
            rej(err);
        });
    });
}
exports.GetWriteDatabaseClient = GetWriteDatabaseClient;

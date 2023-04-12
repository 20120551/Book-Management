import { DataTypes, Sequelize } from "sequelize";
import { MovieModel, ActorModel } from "@Infrastructure/Write/Models";
import {
    MovieId, MovieName, MoviePrice,
    MovieSlot, Localization, MovieStatus
} from "@Domain/ValueObjects";
import * as tedious from 'tedious';

export type DbClient = Sequelize;
export type DbType = {
    database: string,
    host: string,
    username: string,
    password: string,
    port: number
};
export async function GetDatabaseClient({ database, host, username, password, port }: DbType) {
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
    const sequelize = new Sequelize(config.database, config.username, config.password, {
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
    MovieModel.init({
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            set(value: MovieId) {
                this.setDataValue("Id", value.Guid);
            },
            get() {
                const value = this.getDataValue("Id");
                return MovieId.Create(value);
            }
        },
        Status: {
            type: DataTypes.STRING,
            set(value: MovieStatus) {
                this.setDataValue("Status", value.Status);
            },
            get() {
                const value = this.getDataValue("Status");
                return MovieStatus.Create(value);
            }
        },
        Name: {
            type: DataTypes.STRING,
            set(value: MovieName) {
                this.setDataValue("Name", value.Name);
            },
            get() {
                const value = this.getDataValue("Name");
                return MovieName.Create(value);
            }
        },
        Slot: {
            type: DataTypes.INTEGER,
            set(value: MovieSlot) {
                this.setDataValue("Slot", value.Slot);
            },
            get() {
                const value = this.getDataValue("Slot");
                return MovieSlot.Create(value);
            }
        },
        Price: {
            type: DataTypes.FLOAT,
            set(value: MoviePrice) {
                this.setDataValue("Price", value.Price);
            },
            get() {
                const value = this.getDataValue("Price");
                return MoviePrice.Create(value);
            }
        },
        Localization: {
            type: DataTypes.STRING,
            set(value: Localization) {
                this.setDataValue("Localization", `${value.District},${value.City}`);
            },
            get() {
                const value = this.getDataValue("Localization");
                const [District, City] = value.split(",");
                return Localization.Create(District, City);
            }
        }
    }, {
        sequelize,
        tableName: "Movie"
    });

    // init actor model
    ActorModel.init({
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        Name: {
            type: DataTypes.STRING
        },
        Role: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: "Actor"
    });

    // set constrain
    MovieModel.hasMany(ActorModel, {
        sourceKey: "Id",
        foreignKey: "MovieId",
        as: "Actors"
    })

    return new Promise<Sequelize>((res, rej) => {
        sequelize.sync()
            .then(() => {
                console.log('connect to write side database successfully');
                res(sequelize);
            })
            .catch(err => {
                console.log('fail to connect to write side database');
                rej(err);
            })
    });
}
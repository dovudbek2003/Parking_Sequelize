import * as dotenv from 'dotenv'
import { IConfig } from '../interfaces/interface'
dotenv.config()

export const config: IConfig = {
    serverPort: Number(process.env.SERVER_PORT),
    dbPort: Number(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbUserName: process.env.DB_USER_NAME,
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD
}

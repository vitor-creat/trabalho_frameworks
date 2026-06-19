import { PoolConnection } from "mysql2"
import mysql from "mysql2/promise"


export const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"animesdb"
})

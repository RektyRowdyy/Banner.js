import mysql from 'mysql2'
import { DB_NAME } from '../constants.mjs'

const connectDB = async () => {
    try {
        
        const connectionInstance = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: DB_NAME
        }).promise();
        return connectionInstance;

    } catch (error) {
        console.error("Unexpected error occurred while connecting to MySQL!", error);
        process.exit(1);
    }
}

export default connectDB
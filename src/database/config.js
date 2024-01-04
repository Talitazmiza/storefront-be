
require('dotenv').config()

// const db = new Sequelize(process.env.DATABASE, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
//     host: process.env.HOST_DB,
//     dialect: 'postgres'
// });

// module.exports = { db }

const { Pool } = require('pg');

const DB = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "postgres",
    database: "pensolib",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function InitializeDatabase() {
    try {
        await DB.connect()
        console.log('Connection has been established successfully')
    } catch (error) {
        console.log('Unable to connect to the database : ', error)
    }
}

module.exports = { DB, InitializeDatabase };

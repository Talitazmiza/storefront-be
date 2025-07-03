
// require('dotenv').config()

// const db = new Sequelize(process.env.DATABASE, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
//     host: process.env.HOST_DB,
//     dialect: 'postgres'
// });

// module.exports = { db }

// const { Pool } = require('pg');

// const Hapi = require('@hapi/hapi');
// const mysql2 = require('mysql2/promise'); // Use the promise-based API

// const DB = new Pool({
//     host: 'localhost',
//     user: 'root',
//     password: "",
//     database: "etapens",
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// });


// async function InitializeDatabase() {
//     try {
//         await DB.connect()
//         console.log('Connection has been established successfully')
//     } catch (error) {
//         console.log('Unable to connect to the database : ', error)
//     }
// }

// module.exports = { DB, InitializeDatabase };

var db = require('mysql2');

const db_name = 'etapens';
const db_user = 'root';
const db_pass = '';
const db_host = 'localhost';

var DB = db.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_name
});

DB.connect(function(err) {
    if (err) {
        console.error('[mysql error]' + err.stack);
        return;
    }
});


module.exports = {DB};
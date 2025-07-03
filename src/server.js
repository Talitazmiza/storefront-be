'use strict';
// require("dotenv").config();
require('dotenv/config')
const Hapi = require('@hapi/hapi');
const Path = require('path');
const students = require("./api/index");
// const { InitializeDatabase } = require('./database/config')

const init = async () => {

    // await InitializeDatabase();

    const clientOpts = {
        settings: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'etapens',
            // connectionLimit: 10, // Optional: set connection limit
        },
        decorate: true, // Add the plugin to the request object.
    };

    // const studentService = new StudentService();

    const server = Hapi.server({
        port: 8000,
        host: "localhost",
        routes: {
            // files: {
            //     relativeTo: Path.join(__dirname, '..', 'public')
            // }
            "cors": true
        }
    });

    await server.register(require('@hapi/inert'));
    // server.route({
    //     method: 'GET',
    //     path: '/{filename}',
    //     handler: function (request, h) {
    //         console.log("Folder Path : ", Path.join(__dirname, '..', 'public'))
    //         return h.file(`${request.params.filename}`);
    //     }
    // });

    await server.register([
        {
            plugin: students,
        },
        {
            plugin: require('hapi-mysql2'),
            options: clientOpts,
        }
    ]);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const Sockets = require('./sockets');
const cors = require('cors');
const configApp = require('../config/app');

class Server {

    constructor() {
        
        this.app = express();
        this.port = configApp.port;

        // Http Server
        this.server = http.createServer(this.app);

        // Configuración de sockets
        this.io = socketIo(this.server, {
            cors: {
                origin:  configApp.origin,
                methods: configApp.methods,
                allowedHeaders: configApp.allowedHeaders,
                credentials: configApp.credentials,
            }
        });

    }

    middlewares () {
        // servir directorio estatico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        // habilitar cors
        this.app.use(cors({ origin: configApp.origin }));
    }

    configSockets () {
        new Sockets(this.io);
    }

    // correr el servidor
    execute = () => {

        // inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.configSockets();

        this.server.listen(this.port, () => {
            console.log(`Run server on port: ${this.port}`)
        });
    }

}


module.exports = Server;
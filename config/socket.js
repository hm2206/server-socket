'use strict';

const { socketConnect, socketDisconnect } = require('../app/Listeners/SocketListener');

// exportar configuración
module.exports = {

    /**
     * Configurarcion de la ruta de los eventos
     */
    path: '../start/listener.js',

    /**
     * Configuracion de la ruta de los listeners de los eventos
     */
    pathListeners: '../app/Listeners/',

    /**
     * Callback de conexión de socket
     */
    socketConnect: socketConnect,

    /**
     * Callback de desconexión de socket
     */
    socketDisconnect: socketDisconnect,

};
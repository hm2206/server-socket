'use strict'

require('dotenv').config();

module.exports = {

    /**
     * configurar puerto
     */
    port: process.env.PORT || 3333,

    /**
     * Configurar cors
     */
    origin: '*',

    /**
     * Métodos permitidos
     */
    methods: ['GET', 'POST'],

    /**
     * Cabezeras permitidas
     */
    allowedHeaders: [
        "Authorization",
        "ClientId",
        "ClientSecret"
    ],

    /**
     * habilitar credentials
     */
    credentials: true,

};
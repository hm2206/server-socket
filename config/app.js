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
    origin: false,


};
'use strict';

const socketConnect = async ({ connection, socket, request, auth }) => {
    // añadir connecion al cliente
    socket.join(auth.user.username);
}

const socketDisconnect = ({ connection, socket, auth }) => {
    console.log(`client desconectado ${socket.id}`);
}


module.exports = { socketConnect, socketDisconnect };
'use strict';

const socketConnect = async ({ connection, socket, request, auth }) => {
    // añadir connecion al cliente
    socket.join(auth.user.username);
    console.log(`client-conectado: ${auth.user.username || 'invitado'}`);
}

const socketDisconnect = ({ connection, socket, auth }) => {
    console.log(`client desconectado ${socket.id}`);
}


const socketError = ({ message, socket }) => {
    console.log(`socket denegado ${socket.id}, message => ${message}`);
}


module.exports = { socketConnect, socketDisconnect, socketError };
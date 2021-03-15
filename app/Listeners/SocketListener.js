'use strict';

const socketConnect = async ({ connection, socket, request, auth }) => {
    // añadir connecion al cliente
    socket.join(auth.user.username);
    console.log(`client-conectado: ${auth.user.username || 'invitado'}`);
}

const socketDisconnect = ({ connection, socket, auth }) => {
    console.log(`client desconectado ${socket.id}`);
}


const socketError = ({ message, socket, request }) => {
    console.log(`socket denegado ${socket.id}, message => ${message}`);
    console.log(`headers: ${JSON.stringify(request.headers())}`);
    socket.disconnect();
}


module.exports = { socketConnect, socketDisconnect, socketError };
'use strict';

class TramiteListener {

    connect = async ({ socket, auth }) => {
        // añadir connecion al cliente
        socket.join(`tramite@${auth.user.id}`);
        console.log(`tramite => client-conectado: ${auth.user.username}`);
    }

    disconnect = async ({ socket }) => {
        console.log(`desconectado a trámite: ${socket.id}`);
    }

    inbox = async ({ connection, socket, auth, data }) => {
        // add sala
        socket.join(data);
        // send message
        connection.emit("inbox:message", `connect: ${data}`);
        console.log(`connectado a: ${data}`);
    }

    store = async ({ connection, socket, data }) => {
        // desconectar socket
        socket.disconnect();
        // procesar información
        let { tramite, tracking } = data;
        if (tracking.modo == "DEPENDENCIA") {
            let sala = `${tracking.modo}#${tramite.dependencia_origen_id}`;
            connection.to(sala).emit('Tramite/TramiteListener.store', data);
        } 
        // emitir al usuario a verificar
        connection.to(`tramite@${tracking.user_verify_id}`).emit('Tramite/TramiteListener.store', data);
    }

    verify = async ({ connection, socket, data }) => {
        socket.disconnect();
        // enviar tracking
        if (data.modo == "DEPENDENCIA") {
            let sala = `${data.modo}#${data.dependencia_id}`;
            connection.to(sala).emit('Tramite/TramiteListener.verify', data);
        } 
        // emitir al usuario a verificar
        connection.to(`tramite@${data.user_verify_id}`).emit('Tramite/TramiteListener.verify', data);
    }

}

module.exports = TramiteListener;
'use strict';

class NotificationListener {

    index = ({ connection, socket, request }) => {
        
    }

    store = async ({ connection, socket, request, data, auth }) => {
        let { receive } = data;
        // emitir evento al receptor
        connection.to(receive.username).emit('NotificationListener.store', data);
        // cerrar conexíon
        socket.disconnect();
    }

}

module.exports = NotificationListener;
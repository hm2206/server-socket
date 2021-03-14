'use strict';

class NotificationListener {

    index = ({ connection, socket, request }) => {
        
    }

    store = ({ connection, socket, request, data }) => {
        let { receive } = data;
        // emitir evento al receptor
        connection.of(receive.username).emit('NotificationListener.store');
    }

}

module.exports = NotificationListener;
'use strict';

class NotificationEvent {

    index = ({ name, connection, socket }) => {
        socket.emit(name, {
            message: "Hola",
            success: true,
            notification: {}
        });
    }

}

module.exports = NotificationEvent;
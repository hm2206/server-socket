
const ConfigSocket = require('../config/socket');
const Event = require('./event');


class Sockets {

    constructor(io) {
        this.io = io;
        // executar socket events
        this.socketEvents();
    }

    socketEvents () {  
        // importar eventos
        require(ConfigSocket.path);  
        // executar socket root
        this._execute(this.io, Event.listOn, ConfigSocket.socketConnect, ConfigSocket.socketDisconnect);
        // executar namespaces
        Object.keys(Event.listNamespace).filter(async name => {
            let newConnection = this.io.of(name);
            let namespace = Event.listNamespace[name] || {};
            let events = namespace.events || [];
            let config = namespace.config;
            let onConnect = config._onConnect;
            let onDisconnect = config._onDisconnect;
            this._execute(newConnection, events, onConnect, onDisconnect);
        });
    }

    async _execute (connection, events = [], onConnect = null, onDisconnect = null) {
        // executar connection
        connection.on('connection', async (socket) => {
            // handle connection
            if (typeof onConnect == 'function') onConnect({ 
                connection,
                socket,
                date: new Date
            });
            // execute events
            events.filter(evt => {
                socket.on(evt.name, async (data) => {
                    await evt.handle({
                        connection, 
                        socket,
                        date: new Date,
                        data
                    });
                });
            });
            // desconectar socket
            socket.on('disconnect', () => {
                // handle disconnection
                if (typeof onDisconnect == 'function') onDisconnect({ 
                    connection,
                    socket,
                    date: new Date
                });
            })
        });
    }

}


module.exports = Sockets;
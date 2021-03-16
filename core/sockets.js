
const path = require('path');
const ConfigSocket = require('../config/socket');
const Event = require('./event');
const Request = require('./request');
const Auth = require('./auth');

class Sockets {

    constructor(io) {
        this.io = io;
        // request
        this.request = null;
        // auth
        this.auth = null;
        // executar socket events
        this.socketEvents();
    }

    middleware () {
        this.io.use(async (socket, next) => {
            this.request = new Request(socket.request, socket.handshake);
            this.auth = new Auth(this.request);
            await this.auth.verify(socket, ConfigSocket.socketError);
            console.log(this.auth.logged);
            if (this.auth.logged) next();
            else next(new Error("not authorized"));
        });
    }

    async socketEvents () {  
        // executar middlewares
        await this.middleware();
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

    _execute (connection, events = [], onConnect = null, onDisconnect = null) {
        // executar connection
        connection.on('connection', async (socket) => {
            // simplificar
            let request = this.request;
            let auth = this.auth;
            // proceso de socket 
            try {
                // add event
                connection.event = async (handle) => {
                    await this.event(handle, { name: handle, connection, socket, request, auth, date: new Date });
                }
                // handle connection
                await this.connect({ connection, socket, request, auth, onConnect });
                // execute events
                events.filter(evt => {
                    let newName = evt.name;
                    socket.on(newName, async (data) => {
                        let resolver = await evt.handle({ connection, socket, auth: this.auth, date: new Date, data });
                    });
                });
                // desconectar socket
                socket.on('disconnect', () => {
                    this.disconnect({ connection, socket, request, auth, onDisconnect })
                });
            } catch (error) {
                // desconectar socket por error
                socket.disconnect(true);
                this.disconnect({ connection, socket, request, auth, onDisconnect });
            }   
        });
    }

    async event (handle = "", payload = {}) {
        if (typeof handle != 'string') throw new Error("El handle debe ser de tipo string");
        let [className, method] = handle.split('.');
        let ControllerEvent = require(path.resolve(__dirname, ConfigSocket.pathEvents, className)); 
        let resolveEvent = new ControllerEvent();
        handle = resolveEvent[method];
        if (typeof handle != 'function') throw new Error(`No se encontró el handle ${handle}`);
        // executar evento
        return handle(payload);
    }

    connect ({ connection, socket, request, auth, onConnect }) {
        if (typeof onConnect == 'function') onConnect({ 
            connection,
            socket,
            request,
            auth,
            date: new Date
        });
    }

    disconnect ({ connection, socket, request, auth, onDisconnect = null }) {
        if (typeof onDisconnect == 'function') onDisconnect({ 
            connection,
            socket,
            request,
            auth,
            date: new Date
        });
    }

}


module.exports = Sockets;
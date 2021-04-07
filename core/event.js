
const configSocket = require('../config/socket');
const path = require('path');

class Event {

    static listOn = [];
    static listNamespace = {};

    constructor (namespace = null) {
        this._namespace = namespace;
        this._onConnect = null;
        this._onDisconnect = null;
    }

    // obtener handle
    _getHandle = (handle) => {
        if (typeof handle == 'string') {
            let [controller, method] = handle.split('.');
            if (!method) throw new Error(`El método es indefinido %% ${handle}`);
            // importar controlador
            let Controller = require(path.resolve(__dirname, configSocket.pathListeners, controller));
            let newHandle = new Controller();
            handle = newHandle[method];
            if (typeof handle != 'function') throw new Error(`El handle debe ser una función %% ${handle}`);
            return handle;
        } 
        // executar function
        if (typeof handle == 'function') return handle;
        
        // executar error
        throw new Error(`No se encontró el handle %% ${handle}`);
    }

    // metodos estaticos
    static on (name = "", handle = "", event = new Event()) {
        Event.listOn.push({
            name,
            handle: event._getHandle(handle)
        });
    }

    // namespace
    static namespace (namespace, callback = null) {
        if (!namespace) throw new Error("El nombre de espacio es invalido!");
        let event = new Event(namespace);
        Event.listNamespace[namespace] = { 
            config: event,
            events: []
        };
        if (typeof callback == 'function') return callback(event);
    }

    // on this
    on (name, handle) {
        Event.listNamespace[this._namespace].events.push({
            name,
            handle: this._getHandle(handle)
        });
    }

    // callback de conexión
    connect = (handle = "") => {
        let handleTemp = this._getHandle(handle);
        this._onConnect = handleTemp;
    }

    // callback de conexión
    disconnect = (handle = "") => {
        let handleTemp = this._getHandle(handle);
        this._onDisconnect = handleTemp;
    }

}

module.exports = Event;
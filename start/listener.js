const Event = require('../core/event');

// Notificaciones
Event.on('NotificationListener.store', 'NotificationListener.store');

// Tramite
Event.namespace("tramite", (tramite) => {

    // connect
    tramite.connect("Tramite/TramiteListener.connect");
    // disconnect
    tramite.disconnect("Tramite/TramiteListener.disconnect");
    // connect sala
    tramite.on("connect:inbox", "Tramite/TramiteListener.inbox");
    // crear trámite
    tramite.on("Tramite/TramiteListener.store", "Tramite/TramiteListener.store");
    // verificar tracking
    tramite.on("Tramite/TramiteListener.verify", "Tramite/TramiteListener.verify");
});
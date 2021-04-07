# Listeners

```
    ./start/listener.js
```

## Escuchando un evento

```js

    const Event = require('../core/event');

    Event.on('hello_world', ({ socket }) => {
        console.log(`hello socket: ${socket.id}`);
    });

```

## Escuchando un evento en un class Listener

### Creamos nuestro listener en la carpeta
```
    ./app/Listeners/HelloWorld.js
```

### Escuchamos el event en ./start/listener.js

```js

    Event.on('hello_world', 'HelloWorld.handle');

```

### Creamos método handle y realizamos una acción

``` js

    class HelloWorld {

        handle = ({ connection, socket, request, auth }) => {
            console.log(`hello socket ${socket.id}`);
        }

    }

    module.exports = module.exports = NotificationListener;;

```
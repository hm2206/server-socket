const Event = require('../core/event');


Event.on('hello_world', ({ data }) => {
    console.log(data);
});
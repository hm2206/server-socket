'use strict';

const socketConnect = ({ io, socket }) => {
    console.log('connect');
}

const socketDisconnect = ({ io, socket }) => {
    console.log('disconnect');
}


module.exports = { socketConnect, socketDisconnect };
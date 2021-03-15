'use strict';

const cookie = require('cookie');

class Request {

    constructor(request, handshake) {
        this.request = request;
        this.handshake = handshake;
    }

    headers () {
        return this.handshake.headers;
    }

    header (name) {
        return this.headers()[name] || undefined;
    }

    all () {
        return this.handshake.query;
    }

    input (name, value = undefined) {
        return this.all()[name] || value;
    }

    cookies () {
        return cookie.parse(this.headers().cookie || "") || {};
    }

    cookie (name, value = undefined) {
        return this.cookies()[name] || value;
    }

}

module.exports = Request;
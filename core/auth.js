'use strict';

const { authentication } = require('./apis');
const { getClient, getAuthorization } = require('./env');

class Auth {

    constructor(request) {
        this.request = request;   
        this.authentication = authentication;
        // run auth services
        this.initializar();
        // setting data
        this.user = {};
        this.logged = false;
    }

    async initializar () {
        this.authentication.config(this.request.auths());
    }

    async verify (socket, callback = null) {
        let { success, message, user } = await this.authentication.get(`me`)
        .then(res =>  res.data)
        .catch(err => {
            let { data } = err.response || { data: {} };
            return ({
                success: false,
                status: data.status || 401,
                code: err.code || 'ERR_AUTHORIZATION',
                user: {},
                message: data.message || err.message
            })
        });
        // validar logueo
        if (!success) return callback({ message, socket, request: this.request });
        // add
        this.logged = true;
        this.user = user;
    }

}

module.exports = Auth;
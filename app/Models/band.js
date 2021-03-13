const { uid } = require('uid');


class Band {

    constructor(name) {
        this.id = uid(20);
        this.name = name;
        this.votes = 0;
    }

}

module.exports = Band;
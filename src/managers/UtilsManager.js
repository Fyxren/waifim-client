const config = require('../config/config');
const emotes = require('../config/emotes');

class UtilsManager {
    constructor(client) {
        this.client = client;
    }

    get colors() {
        return config.colors;
    }

    get emotes() {
        return emotes;
    }
}

module.exports = UtilsManager;
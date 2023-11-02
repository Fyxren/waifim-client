const moment = require('moment');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';

class Logger {
    constructor(prefix) {
        this.prefix = prefix;
    }

    info(message) {
        console.info(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${MAGENTA}${this.prefix} | Info${RESET} - ${message}`);
    }

    ready(message) {
        console.info(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${GREEN}${this.prefix} | Ready${RESET} - ${message}`);
    }

    error(message) {
        console.error(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${RED}${this.prefix} | Error${RESET} - ${message}`);
    }
}

module.exports = Logger;
const apiUrl = 'https://api.waifu.im/search';
const reqLogger = require('../utils/Logger');
const Logger = new reqLogger('RequestManager');
const fetch = require('node-fetch');

class RequestManager {

    async random(tag, nsfw) {

        let url = apiUrl;
        let params = {};

        if (tag) params.included_tags = tag;
        if (nsfw) params.is_nsfw = true;

        const queryParams = new URLSearchParams(params);
        url += `?${queryParams}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`);
        const json = await res.json();
        const image = json.images[0];
        return image;

    }

}

module.exports = RequestManager;
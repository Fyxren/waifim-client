const { Collection } = require("discord.js");
const moment = require("moment");

class IntervalManager {
    intervals = new Collection();

    constructor(client) {
        this.client = client;
    }

    get(channelId) {
        const interval = this.intervals.get(channelId);
        if (!interval) return null;
        return interval;
    }

    all() {
        return this.intervals;
    }

    async start(channelId) {
        const intervalId = setInterval(async () => {
            let waifu = await this.client.request.random();
            let channel = await this.client.channels.cache.get(channelId);
            channel.send({
                embeds: [{
                    title: waifu.artist?.name ?? '_Unknown Artist_',
                    url: waifu.artist?.patreon || waifu.artist?.pixiv || waifu.artist?.twitter || null,
                    description: `\`🏷️\` ${waifu.tags.map(x => x.name).join(', ')} | \`💖\` ${waifu.favorites}${waifu.source ? ` | \`🔍\` [Source ↗](${waifu.source})` : ''}`,
                    color: parseInt(waifu.dominant_color.replace('#', ''), 16),
                    image: {
                        url: waifu.url
                    },
                    footer: {
                        text: `Uploaded: ${moment(waifu.uploaded_at).format('MMMM Do YYYY')}`,
                    }
                }]
            });

        }, 10 * 60 * 1000);

        this.intervals.set(channelId, { channelId: channelId, intervalId: intervalId });
        return intervalId;
    }

    async stop(channelId) {
        const interval = this.intervals.get(channelId);
        if (!interval) return false;

        clearInterval(interval.intervalId);
        this.intervals.delete(channelId);
        return true;
    }

}

module.exports = IntervalManager;
const moment = require('moment');
const CommandBase = require('../../utils/CommandBase');
const { SlashCommandBuilder } = require('@discordjs/builders');
const tags = require('../../config/tags');

class Random extends CommandBase {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('random')
                .setDescription('Get a random waifu!')
                .addStringOption(option =>
                    option
                        .setName('tag')
                        .setDescription('A tag from the tags list')
                )
                .addBooleanOption(option =>
                    option
                        .setName('nsfw')
                        .setDescription('Get a random NSFW waifu')
                )
        );
    }

    async execute(client, interaction) {

        const tag = interaction.options.getString('tag');
        const nsfw = interaction.options.getBoolean('nsfw');

        // When tag provided, does the tag exist?
        if (tag && !tags.find(x => x.name === tag)) return interaction.reply({
            embeds: [{
                description: client.utils.emotes.fail + `The provided tag does not exist. Please omit the tag or chose one of the following:\n\n${tags.map(x => `\`${x.is_nsfw ? '🔞 ' : ''}${x.name}\``).join(', ')}`,
                color: client.utils.colors.fail
            }]
        });

        // Is the tag a NSFW tag and is the channel NSFW?
        if ((tag && tags.find(x => x.name === tag).is_nsfw && !interaction.channel.nsfw) || (nsfw && !interaction.channel.nsfw)) return interaction.reply({
            embeds: [{
                description: '🔞 This tag can only be used in NSFW channels.',
                color: client.utils.colors.fail
            }]
        });

        // Get a random waifu
        const waifu = await client.request.random(tag, nsfw);
        interaction.reply({
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
    }
}

module.exports = Random;
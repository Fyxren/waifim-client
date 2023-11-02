const CommandBase = require('../../utils/CommandBase');
const { SlashCommandBuilder } = require('@discordjs/builders');

class Random extends CommandBase {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('autopost')
                .setDescription('Enable autoposting in the current channel.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('start')
                        .setDescription('Start autoposting in the current channel.')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('stop')
                        .setDescription('Stop autoposting in the current channel.')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('list')
                        .setDescription('🔒 List all channels with autoposting enabled.')
                )
        );
    }

    async execute(client, interaction) {

        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'start':

                await client.interval.start(interaction.channelId, interaction.guildId);
                return interaction.reply({
                    embeds: [{
                        description: client.utils.emotes.done + `Autoposting enabled in this channel.`,
                        color: client.utils.colors.done
                    }]
                });

            case 'stop':

                const exists = await client.interval.get(interaction.channelId);
                if (!exists) {
                    return interaction.reply({
                        embeds: [{
                            description: client.utils.emotes.fail + `Autoposting is not enabled in this channel.`,
                            color: client.utils.colors.fail
                        }]
                    });
                }

                await client.interval.stop(interaction.channelId);
                return interaction.reply({
                    embeds: [{
                        description: client.utils.emotes.done + `Autoposting disabled in this channel.`,
                        color: client.utils.colors.done
                    }]
                });

            case 'list':

                if (interaction.user.id !== client.config.ownerId) return interaction.reply({
                    embeds: [{
                        description: client.utils.emotes.fail + `You don't have permission to use this command.`,
                        color: client.utils.colors.fail
                    }]
                });

                const list = client.interval.all();
                let embed = {
                    title: 'Autoposting Channels',
                    color: client.utils.colors.main,
                    footer: {
                        text: `Total: ${list.size}`
                    }
                };

                if (list.size === 0) embed.description = '> _No channels found._';

                embed.description = list.map(x => {
                    let channel = client.channels.cache.get(x.channelId);
                    return `- **${channel.guild.name}** - \`${channel.name}\` (<#${channel.id}>)`;
                }).join('\n');

                return interaction.reply({
                    embeds: [embed]
                });

            default:
                break;
        }



    }
}

module.exports = Random;
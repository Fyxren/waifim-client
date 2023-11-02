const CommandBase = require('../../utils/CommandBase');
const { SlashCommandBuilder } = require('@discordjs/builders');
const tags = require('../../config/tags');

class Tags extends CommandBase {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('tags')
                .setDescription('Information about tags.')
                .addStringOption(option =>
                    option
                        .setName('tag')
                        .setDescription('A tag from the list for more details'))
        );
    }

    async execute(client, interaction) {

        const tag = interaction.options.getString('tag');
        if (!tag) {
            let embed = {
                title: 'Tags',
                description: 'Tags are used to filter the waifus you get. You can use the `/random` command with a tag to get a waifu with that tag.',
                color: client.utils.colors.main,
                thumbnail: {
                    url: client.user.avatarURL({ size: 4096 })
                },
                fields: [
                    {
                        name: 'Versitile',
                        value: tags.map(x => `\`${x.name}\``).join(', ')
                    },
                    {
                        name: 'NSFW',
                        value: tags.filter(x => x.is_nsfw).map(x => `\`${x.name}\``).join(', ')
                    }
                ]
            };

            return interaction.reply({
                embeds: [embed]
            });
        }

        const tagInfo = tags.find(x => x.name === tag);
        if (!tagInfo) return interaction.reply({
            content: 'Invalid tag!',
            ephemeral: true
        });

        let embed = {
            title: `🏷️ Tag: ${tagInfo.name}`,
            description: `> _${tagInfo.description}_ ${tagInfo.is_nsfw && '\n\n🔞 This tag can only be used in NSFW channels.'}`,
            color: client.utils.colors.main,
            thumbnail: {
                url: client.user.avatarURL({ size: 4096 })
            },
            fields: []
        };

        return interaction.reply({
            embeds: [embed]
        });

    }
}


module.exports = Tags;
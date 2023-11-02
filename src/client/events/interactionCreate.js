const EventBase = require('../../utils/EventBase');

class InteractionCreate extends EventBase {
    constructor(props) {
        super({ name: 'interactionCreate' });
    }

    execute(client, interaction) {
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (cmd) cmd.execute(client, interaction);
        }
    }
}

module.exports = InteractionCreate;
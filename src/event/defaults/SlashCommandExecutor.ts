import { Event } from '@interfaces/Event';

export const moduleEvent: Event = {
  name: 'interactionCreate',
  execute: async (client, instance, interaction) => {
    if (!interaction.isCommand()) { return; }

    const command = instance.registeredSlashCommands.get(interaction.commandName);

    if (!command) { return; }

    try {
      await command.execute(client, interaction);
    } catch (err) {
      console.log(err);
      await interaction.reply({ content: 'An error occurred while executing this command.' });
    }
  }
};

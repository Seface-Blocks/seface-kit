/*
  This file is an event that is automatically
  registered by the configured client.
*/

import { Event } from '@interfaces/Event';
import { Client, CommandInteraction } from 'discord.js';
import SefaceKit from '../..';

export const event: Event = {
  name: 'interactionCreate',
  execute: async (client: Client, instance: SefaceKit, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) { return; }

    const command = instance.getSlashCommands.get(interaction.commandName);
    const sender = interaction.guild.members.cache.get(interaction.user.id);

    if (!command) { return; }

    try {
      await command.execute(client, interaction, sender, instance);
    } catch (err) {
      console.log(err);
      await interaction.reply({ content: 'An error occurred while executing this command.' });
    }
  }
};

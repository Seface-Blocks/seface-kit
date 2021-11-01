import { SlashCommand } from 'seface-kit';

export const command: SlashCommand = {
  name: 'ping',
  descriptions: 'Ping! Pong!',
  options: [],
  guilds: 'YOUR_GUILD_ID',
  isSlashCommand: true,

  execute: async (client, interaction, sender, instance) => {
    interaction.reply('Pong!');
  }
};

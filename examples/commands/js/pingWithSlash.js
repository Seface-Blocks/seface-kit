export const command = {
  name: 'ping',
  description: 'Returns pong!',
  isSlashCommand: true,
  execute: (client, interaction) => {
    interaction.reply('Pong!');
  }
};

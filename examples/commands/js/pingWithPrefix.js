export const command = {
  name: 'ping',
  description: 'Returns pong!',
  aliases: ['p'],
  execute: (client, i, message, args) => {
    message.reply('Pong!');
  }
};

export const command = {
  name: 'ping',
  description: 'Returns pong!',
  aliases: ['p'],
  run: (client, message, args) => {
    message.channel.send('Pong!');
  }
};

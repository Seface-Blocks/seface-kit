const command = {
  name: 'ping',
  description: 'Ping! Pong!',
  isSlashCommand: false,
  execute: async (client, message, _args) => {
    message.channel.send('Pong!');
  }
};

module.exports = { command };

export const command = {
  name: 'test',
  description: 'Configure a new chat to a new project.',
  aliases: ['p'],
  execute: async (client, message, args) => {
    message.reply('Test');
  }
};

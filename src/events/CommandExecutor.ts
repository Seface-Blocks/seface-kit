import { Message } from 'discord.js';
import { Event } from '../utils/interfaces/Event';

export const moduleEvent: Event = {
  name: 'message',
  run: async (client, instance, message: Message) => {
    if (message.author.bot) { return; }
    if (message.channel.type === 'dm') { return; }
    if (!message.content.startsWith(instance.options.prefix)) { return; }

    const args = message.content
      .slice(instance.options.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (!command) { return; }

    const commandCollection = instance.registeredCommands.get(command) || instance.registeredCommandAliases.get(command);

    if (commandCollection) {
      commandCollection.run(client, message, args);
    }
  }
};

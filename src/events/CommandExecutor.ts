import { Message } from 'discord.js';
import { Event } from '../utils/interfaces/Event';

export const moduleEvent: Event = {
  name: 'message',
  run: async (client, instance, message: Message) => {
    const { author, member, channel, content } = message;

    if (author.bot) { return; }
    if (channel.type === 'dm') { return; }
    if (!content.startsWith(instance.options.prefix)) { return; }

    const args = content.slice(instance.options.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) { return; }

    const commandCollected = instance.registeredCommands.get(command) || instance.registeredCommandAliases.get(command);

    if (commandCollected) {
      commandCollected.run(client, message, args);
    }
  }
};

import { Message } from 'discord.js';
import { Event } from '../../interfaces/Event';

export const moduleEvent: Event = {
  name: 'messageCreate',
  run: async (client, instance, message: Message) => {
    const { author, channel, content } = message;

    if (author.bot) { return; }
    if (channel.type === 'DM') { return; }
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

/*
  This file is an event that is automatically
  registered by the configured client.
*/

import { Message } from 'discord.js';
import { Event } from '@interfaces/Event';

export const event: Event = {
  name: 'messageCreate',
  execute: async (client, instance, message: Message) => {
    const { author, channel, content } = message;

    if (author.bot) { return; }
    if (channel.type === 'DM') { return; }
    if (!content.startsWith(instance.options.prefix)) { return; }

    const args = content.slice(instance.options.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) { return; }

    const commandCollected = instance.getPrefixCommands.get(command) || instance.getPrefixCommandsAliases.get(command);

    if (commandCollected) {
      commandCollected.execute(client, message, args);
    }
  }
};

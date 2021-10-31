/*
  This file is an event that is automatically
  registered by the configured client.
*/

import { Client, Message } from 'discord.js';
import { Event } from '@interfaces/Event';
import SefaceKit from '../..';

export const event: Event = {
  name: 'messageCreate',
  execute: async (client: Client, instance: SefaceKit, message: Message) => {
    const { author, channel, content } = message;

    if (author.bot) { return; }
    if (channel.type === 'DM') { return; }
    if (!content.startsWith(instance.getOptions.prefix)) { return; }

    const args = content.slice(instance.getOptions.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) { return; }

    const commandCollected = instance.getPrefixCommands.get(command) || instance.getPrefixCommandsAliases.get(command);

    if (commandCollected) {
      commandCollected.execute(client, message, args);
    }
  }
};

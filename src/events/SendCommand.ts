import { Message } from 'discord.js';
import { Event } from '../interfaces/Event';

export const moduleEvent: Event = {
  name: 'message',
  run: async (client, instance, message: Message) => {
    if (message.author.bot) { return; }
    if (message.channel.type === 'dm') { return; }

    message.channel.send('Teste?');
  }
};

import { Client, ClientEvents } from 'discord.js';
import SefaceKit from '../..';

interface EventExecutor {
  (client: Client, instance: SefaceKit, ...args: any[]);
}

/**
 * @example
 * export const event: Event = {
 *   name: 'message',
 *   run: (client, instance, message) => {
 *     if (msg.author.bot) { return; }
 *
 *     message.reply("Hi there 👋");
 *   }
 * }
 */
export interface Event {
  name: keyof ClientEvents | any;
  run: EventExecutor;
}

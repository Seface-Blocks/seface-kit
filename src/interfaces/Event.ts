import { Client, ClientEvents } from 'discord.js';
import SefaceKit from '..';

interface EventExecutor {
  (client: Client, instance: SefaceKit, ...args: any[]);
}

/**
 * @param {any} name The event name to be triggered.
 * @param {EventExecutor} run The callback function to be called when the event has been triggered.
 *
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

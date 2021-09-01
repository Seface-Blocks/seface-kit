import { Client, ClientEvents } from 'discord.js';
import SefaceKit from '..';

export interface EventExecutor {
  (client: Client, instance: SefaceKit, ...args: any[]): Promise<void>;
}

/**
 * @example
 * export const event: Event = {
 *   name: 'message',
 *   run: (client, instance, message) => {
 *     if (msg.author.bot) { return; }
 *    
 *     if (msg.content === 'Hi') {
 *      message.reply("Hi there 👋");
 *     }
 *   }
 * }
 */
export interface Event {
  name: keyof ClientEvents | string;
  execute: EventExecutor;
}

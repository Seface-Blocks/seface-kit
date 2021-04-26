import { Client, Message } from 'discord.js';

interface CommandExecutor {
  (client: Client, message: Message, args: string[]);
}


/**
 * @param {string} name The command name.
 * @param {description} name The description of command.
 * @param {EventExecutor} run The callback function to be called when the event has been triggered.
 *
 * @example
 * export const event: Event = {
 *   name: 'ping',
 *   description: 'Reply pong to the message author.',
 *   run: (client, message, args) => {
 *     if (msg.author.bot) { return; }
 *
 *     message.reply("Pong!");
 *   }
 * }
 */
export interface Command {
  name: string;
  description?: string;
  run: CommandExecutor;
}

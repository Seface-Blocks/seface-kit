import { Client, Message } from 'discord.js';

interface CommandExecutor {
  (client: Client, message: Message, args: string[]);
}

/**
 * @example
 * export const command: Command = {
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
  aliases?: string[];
  run: CommandExecutor;
}

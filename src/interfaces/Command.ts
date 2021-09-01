import { Client, CommandInteraction, Message } from 'discord.js';

interface CommandExecutor {
  (client: Client, interaction?: CommandInteraction, message?: Message, args?: string[]);
}

/**
 * Use `run` for commands with prefix and `execute` for slash commands.
 * 
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
  isSlashCommand?: boolean;
  execute?: CommandExecutor;
}

import { Client, Message } from 'discord.js';

interface CommandExecutor {
  (client: Client, message: Message, args: string[]);
}

export interface Command {
  name: string;
  description?: string;
  run: CommandExecutor;
}

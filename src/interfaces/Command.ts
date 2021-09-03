import { Client, CommandInteraction, Message } from 'discord.js';

interface PrefixCommandExecutor {
  (client: Client, message: Message, args: string[]): Promise<void>;
}

interface SlashCommandExecutor {
  (client: Client, interaction: CommandInteraction): Promise<void>;
}

interface CommandBase {
  name: string;
  description: string;
  isSlashCommand?: boolean;
}

interface SlashCommandOptions {
  name: string;
  description: string;
  type: number;
  required?: boolean;
}

export interface SlashCommand extends CommandBase {
  options?: SlashCommandOptions[];
  registerOn?: string[];
  execute?: SlashCommandExecutor;
}

export interface PrefixCommand extends CommandBase {
  aliases?: string[];
  execute?: PrefixCommandExecutor;
}

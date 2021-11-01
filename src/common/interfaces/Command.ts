import { Client, CommandInteraction, GuildMember, Message } from 'discord.js';
import SefaceKit from '../..';

interface PrefixCommandExecutor {
  (client: Client, message: Message, args: string[]): Promise<void>;
}

interface SlashCommandExecutor {
  (client: Client, interaction: CommandInteraction, sender: GuildMember, instance: SefaceKit): Promise<void>;
}

interface CommandBase {
  name: string;
  description: string;
  isSlashCommand?: boolean;
  ignoreRegister?: boolean;
}

interface SlashCommandOptions {
  name: string;
  description: string;
  required?: boolean;
  type: number;
}

export interface SlashCommand extends CommandBase {
  options?: SlashCommandOptions[];
  guilds?: string[] | string;
  execute: SlashCommandExecutor;
}

export interface PrefixCommand extends CommandBase {
  aliases?: string[];
  execute: PrefixCommandExecutor;
}

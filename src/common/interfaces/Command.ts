import { Client, CommandInteraction, GuildMember, Message } from 'discord.js';
import { SefaceKit } from '../..';

interface PrefixCommandExecutor {
  (client: Client, message: Message, args: string[], instance: SefaceKit): Promise<void>;
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

interface SlashCommandPermissions {
  id: string;
  type: 'USER' | 'ROLE';
  permission: boolean;
}

export interface SlashCommand extends CommandBase {
  guilds?: string[] | string;
  options?: SlashCommandOptions[];
  permissions?: SlashCommandPermissions[];
  execute: SlashCommandExecutor;
}

export interface PrefixCommand extends CommandBase {
  aliases?: string[];
  execute: PrefixCommandExecutor;
}

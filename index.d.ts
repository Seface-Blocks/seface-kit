import { Client, ClientEvents, Collection } from 'discord.js';

export default class SefaceKit {
  public constructor(client: Client, options: SefaceKitOptions);
  public get client(): Client;
  public get options(): SefaceKitOptions;
  public getPrefixCommands(): Collection<string, PrefixCommand>;
  public getPrefixCommandsAliases(): Collection<string, PrefixCommand>;
  public getSlashCommands(): Collection<string, SlashCommand>;
  public getEvents(): Collection<string, PrefixCommand>;
}

export class Utils {
  public checkFileExtension(file: string, extension: string[]): boolean;
}

export class DiscordService {
  public constructor(client: Client);
  public async postSlashCommandGlobally(command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void>;
  public async postSlashCommandGuild(guildId: string, command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void>
}

export class SefaceKitEvents {
  public constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit);
}

export class EventHandler {
  public constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit);
}

export class CommandHandler {
  public constructor(
    directory: string,
    prefixCommandsCollection: Collection<string, PrefixCommand>,
    prefixCommandsAliasesCollection: Collection<string, PrefixCommand>,
    slashCommandsCollection: Collection<string, SlashCommand>,
    instance: SefaceKit);
}

export interface SefaceKitOptions {
  commandsIn: string;
  eventsIn: string;
  prefix: string;
  showWarns: boolean;
}

export interface EventExecutor {
  (client: Client, instance: SefaceKit, ...args: any[]): Promise<void>;
}

export interface Event {
  name: keyof ClientEvents | string;
  execute: EventExecutor;
}

interface PrefixCommandExecutor {
  (client: Client, message: Message, args: string[]): Promise<void>;
}

interface SlashCommandExecutor {
  (client: Client, interaction: CommandInteraction): Promise<void>;
}

export interface CommandBase {
  name: string;
  description: string;
  isSlashCommand?: boolean;
}

export interface SlashCommandOptions {
  name: string;
  description: string;
  required?: boolean;

  /** Type definitions can be found [here](https://bit.ly/3n117So) */
  type: number;
}

export interface SlashCommand extends CommandBase {
  options?: SlashCommandOptions[];
  register?: string[] | 'GLOBALLY';
  execute?: SlashCommandExecutor;
}

export interface PrefixCommand extends CommandBase {
  aliases?: string[];
  execute?: PrefixCommandExecutor;
}

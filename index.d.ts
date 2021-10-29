import { Client, ClientEvents, Collection, CommandInteraction, Message } from 'discord.js';

export default class SefaceKit {
  public constructor(client: Client, options: SefaceKitOptions);
  public get getClient(): Client;
  public get getOptions(): SefaceKitOptions;
  public getPrefixCommands(): Collection<string, PrefixCommand>;
  public getPrefixCommandsAliases(): Collection<string, PrefixCommand>;
  public getSlashCommands(): Collection<string, SlashCommand>;
  public getEvents(): Collection<string, Event>;
}



// SERVICES
export class SlashCommandService {
  public constructor(client: Client);
  public addGlobally(command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void>;
  public addOnGuild(guildId: string, command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void>
}

// HANDLERS
export class ClientHandler {
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

// OTHERS
export class Utils {
  public checkFileExtension(file: string, extension: string[]): boolean;
}

// INTERFACES AND TYPES
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
  guilds?: string[] | string;
  execute?: SlashCommandExecutor;
}

export interface PrefixCommand extends CommandBase {
  aliases?: string[];
  execute?: PrefixCommandExecutor;
}

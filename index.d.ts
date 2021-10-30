import Discord from 'discord.js';

// COMMON
export default class SefaceKit {
  public constructor(client: Discord.Client, options: SefaceKitOptions);
  public get getClient(): Discord.Client;
  public get getOptions(): SefaceKitOptions;
  public get getPrefixCommands(): Discord.Collection<string, PrefixCommand>;
  public get getPrefixCommandsAliases(): Discord.Collection<string, PrefixCommand>;
  public get getSlashCommands(): Discord.Collection<string, SlashCommand>;
  public get getEvents(): Discord.Collection<string, Event>;
}

// SERVICES
export class SlashCommandService {
  public constructor(client: Discord.Client);
  public addGlobally(command: SlashCommand, collection: Discord.Collection<string, SlashCommand>): Promise<void>;
  public addOnGuild(guildId: string, command: SlashCommand, collection: Discord.Collection<string, SlashCommand>): Promise<void>
}

// HANDLERS
export class ClientHandler {
  public constructor(directory: string, collection: Discord.Collection<string, Event>, instance: SefaceKit);
}

export class EventHandler {
  public constructor(directory: string, collection: Discord.Collection<string, Event>, instance: SefaceKit);
}

export class CommandHandler {
  public constructor(
    directory: string,
    prefixCommandsCollection: Discord.Collection<string, PrefixCommand>,
    prefixCommandsAliasesCollection: Discord.Collection<string, PrefixCommand>,
    slashCommandsCollection: Discord.Collection<string, SlashCommand>,
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
  (client: Discord.Client, instance: SefaceKit, ...args: any[]): Promise<void>;
}

export interface Event {
  name: keyof Discord.ClientEvents | string;
  execute: EventExecutor;
}

interface PrefixCommandExecutor {
  (client: Discord.Client, message: Discord.Message, args: string[]): Promise<void>;
}

interface SlashCommandExecutor {
  (client: Discord.Client, interaction: Discord.CommandInteraction): Promise<void>;
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

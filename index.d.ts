import Discord from 'discord.js';

// CLIENT
export class SefaceClient {
  public guild: Guild;
  public constructor(client: Discord.Client);
}

export class Guild {
  public category: Category;
  public channel: Channel;
  public role: Role;
  public emoji: Emoji;
  public getGuildByName(name: string): Promise<Discord.Guild>;
  public getGuildById(id: string): Promise<Discord.Guild>;
}

export class Category {
  public getCategoryByName(name: string, guild: Discord.Guild): Promise<Discord.CategoryChannel>;
  public getCategoryById(name: string, guild: Discord.Guild): Promise<Discord.CategoryChannel>;
}

export class Channel {
  public getTextChannelByName(name: string, guild: Discord.Guild): Promise<Discord.TextChannel>;
  public getTextChannelById(id: string, guild: Discord.Guild): Promise<Discord.TextChannel>;
  public getVoiceChannelByName(name: string, guild: Discord.Guild): Promise<Discord.VoiceChannel>;
  public getVoiceChannelById(id: string, guild: Discord.Guild): Promise<Discord.VoiceChannel>;
}

export class Emoji {
  public getEmojiByName(name: string, guild: Discord.Guild): Promise<Discord.Emoji>;
  public getEmojiById(id: string, guild: Discord.Guild): Promise<Discord.Emoji>;
}

export class Role {
  public getEveryone(guild: Discord.Guild): Promise<Discord.Role>;
  public getRoleByName(name: string, guild: Discord.Guild): Promise<Discord.Role>;
  public getRoleById(name: string, guild: Discord.Guild): Promise<Discord.Role>;
}

// COMMON
export class SefaceKit {
  public constructor(client: Discord.Client, options: SefaceKitOptions);
  public get getClient(): Discord.Client;
  public get getOptions(): SefaceKitOptions;
  public get getPrefixCommands(): Discord.Collection<string, PrefixCommand>;
  public get getPrefixCommandsAliases(): Discord.Collection<string, PrefixCommand>;
  public get getSlashCommands(): Discord.Collection<string, SlashCommand>;
  public get getEvents(): Discord.Collection<string, Event>;
  public get utils(): SefaceClient;
}

// SERVICES
export class SlashCommandService {
  public constructor(client: Discord.Client);
  public addGlobally(command: SlashCommand, collection: Discord.Collection<string, SlashCommand>): Promise<void>;
  public addOnGuild(guildId: string, command: SlashCommand, collection: Discord.Collection<string, SlashCommand>): Promise<void>;
  public addPermissionsOnGuild(guildId: string, command: SlashCommand): Promise<void>;
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
  (client: Discord.Client, interaction: Discord.CommandInteraction, sender: Discord.GuildMember, instance: SefaceKit): Promise<void>;
}

export interface CommandBase {
  name: string;
  description: string;
  isSlashCommand?: boolean;
  ignoreRegistered?: boolean;
}

export interface SlashCommandOptions {
  name: string;
  description: string;
  required?: boolean;

  /** Type definitions can be found [here](https://bit.ly/3n117So) */
  type: number;
}

export interface SlashCommandPermissions {
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

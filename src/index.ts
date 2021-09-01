import { Client, Collection } from 'discord.js';

import { Event } from './interfaces/Event';
import { Command } from './interfaces/Command';
import { EventHandler } from './event/EventHandler';
import { CommandHandler } from './command/CommandHandler';
import { SefaceKitOptions } from './interfaces/SefaceKit';
import { SefaceKitEvents } from './event/SefaceKitEvents';

export default class SefaceKit {
  private _client: Client;
  private _options: SefaceKitOptions;
  private _commandsCollection: Collection<string, Command>;
  private _commandsAliasesCollection: Collection<string, Command>;
  private _slashCommandsCollection: Collection<string, Command>;
  private _eventsCollection: Collection<string, Event>;

  /** TODO: jsdoc */
  constructor(client: Client, options: SefaceKitOptions) {
    this._client = client;
    this._options = options;
    this._commandsCollection = new Collection();
    this._commandsAliasesCollection = new Collection();
    this._slashCommandsCollection = new Collection();
    this._eventsCollection = new Collection();

    new CommandHandler(this._options.commandsIn, this._commandsCollection, this._commandsAliasesCollection, this._slashCommandsCollection);
    new EventHandler(this._options.eventsIn, this._eventsCollection, this);
    new SefaceKitEvents('event/defaults', this._eventsCollection, this);
  }

  /** @returns Discord Client instance. */
  public get client(): Client { return this._client; }

  /** @returns Seface Kit options. */
  public get options(): SefaceKitOptions { return this._options; }

  /** @returns Registered commands. */
  public get registeredCommands(): Collection<string, Command> { return this._commandsCollection; }

  /** @returns Registered commands aliases. */
  public get registeredCommandAliases(): Collection<string, Command> { return this._commandsAliasesCollection; }

  /** @returns Registered events. */
  public get registeredEvents(): Collection<string, Event> { return this._eventsCollection; }

  /** @returns Registered slash commands. */
  public get registeredSlashCommands(): Collection<string, Command> { return this._slashCommandsCollection; }
}

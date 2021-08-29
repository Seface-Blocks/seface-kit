import { Client, Collection } from 'discord.js';

import { Event } from './interfaces/Event';
import { Command } from './interfaces/Command';
import { EventHandler } from './event/EventHandler';
import { CommandHandler } from './command/CommandHandler';
import { SefaceKitOptions } from './interfaces/SefaceKit';
import { ModuleEventHandler } from './event/ModuleEventHandler';

export default class SefaceKit {
  private _client: Client;
  private _options: SefaceKitOptions;
  private _commandsCollection: Collection<string, Command>;
  private _commandsAliasesCollection: Collection<string, Command>;
  private _eventsCollection: Collection<string, Event>;

  /** TODO: jsdoc */
  constructor(client?: Client, options?: SefaceKitOptions) {
    this._client = client;
    this._options = options;
    this._commandsCollection = new Collection();
    this._commandsAliasesCollection = new Collection();
    this._eventsCollection = new Collection();

    new CommandHandler(options.commandsIn, this._commandsCollection, this._commandsAliasesCollection, this);
    new EventHandler(options.eventsIn, this._eventsCollection, this);
    new ModuleEventHandler('event/defaults', this._eventsCollection, this);
  }

  /** Return the client of SefaceKit. */
  public get client(): Client { return this._client; }

  /** Return all options of SefaceKit. */
  public get options(): SefaceKitOptions { return this._options; }

  /** Return all registered commands. */
  public get registeredCommands(): Collection<string, Command> { return this._commandsCollection; }

  /** Return all registered command aliases. */
  public get registeredCommandAliases(): Collection<string, Command> { return this._commandsAliasesCollection; }

  /** Return all registered events. */
  public get registeredEvents(): Collection<string, Event> { return this._eventsCollection; }
}

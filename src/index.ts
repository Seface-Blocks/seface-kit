import { Client, Collection } from 'discord.js';

import { Event } from './interfaces/Event';
import { Command } from './interfaces/Command';
import { moduleEventDir } from './config.json';
import { EventHandler } from './handlers/EventHandler';
import { CommandHandler } from './handlers/CommandHandler';
import { SefaceKitOptions } from './interfaces/SefaceKitOptions';
import { ModuleEventHandler } from './handlers/ModuleEventHandler';

export default class SefaceKit {
  private _client: Client;
  private _options: SefaceKitOptions;
  private _commandsCollection: Collection<string, Command>;
  private _eventsCollection: Collection<string, Event>;

  /** TODO: jsdoc */
  constructor(client: Client, options: SefaceKitOptions) {
    this._client = client;
    this._options = options;
    this._commandsCollection = new Collection();
    this._eventsCollection = new Collection();

    new CommandHandler(options.commandsIn, this._commandsCollection, this);
    new EventHandler(options.eventsIn, this._eventsCollection, this);
    new ModuleEventHandler(moduleEventDir, this._eventsCollection, this);
  }

  /** Return the client of SefaceKit. */
  public get client() { return this._client; }

  /** Return all options of SefaceKit. */
  public get options() { return this._options; }

  public get registeredCommands() { return this._commandsCollection; }
}

import { Client, Collection } from 'discord.js';

import { Command } from './interfaces/Command';
import { CommandHandler } from './classes/CommandHandler';
import { SefaceKitOptions } from './interfaces/SefaceKitOptions';

export default class SefaceKit {
  private _client: Client;
  private _options: SefaceKitOptions;
  private _commandsCollection: Collection<string, Command>;

  /** TODO: jsdoc */
  constructor(client: Client, options: SefaceKitOptions) {
    this._client = client;
    this._options = options;
    this._commandsCollection = new Collection();

    new CommandHandler(options.commandsIn, this._commandsCollection, this);
  }

  /** Return the client of SefaceKit. */
  public get client() { return this._client; }

  /** Return all options of SefaceKit. */
  public get options() { return this._options; }

  /** Returns all registered commands. */
  public get registeredCommands() { return this._commandsCollection; }
}

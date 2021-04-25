import { Client, Collection } from 'discord.js';
import { CommandHandler } from './classes/CommandHandler';
import { Command } from './interfaces/Command';
import { SefaceKitOptions } from './interfaces/SefaceKitOptions';

export default class SefaceKit {
  private _client: Client;
  private _commandHandler: CommandHandler;
  private _commandsCollection: Collection<string, Command>;

  /**
   * @param client - Discord Bot client.
   */
  constructor(client: Client, options: SefaceKitOptions) {
    this._client = client;
    this._commandsCollection = new Collection();
    this._commandHandler = new CommandHandler(options.commandsIn, this._commandsCollection);
  }

  public get client() { return this._client; }

  /** Returns all registered commands. */
  public get registeredCommands() { return this._commandsCollection; }
}

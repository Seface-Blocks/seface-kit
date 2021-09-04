import { Client, Collection } from 'discord.js';

import { Event } from '@interfaces/Event';
import { SefaceKitOptions } from '@interfaces/SefaceKit';
import { PrefixCommand, SlashCommand } from '@interfaces/Command';
import { CommandHandler } from '@command/CommandHandler';
import { EventHandler } from '@event/EventHandler';
import { SefaceKitEvents } from '@event/SefaceKitEvents';

export default class SefaceKit {
  private _client: Client;
  private _options: SefaceKitOptions;

  private _prefixCommands: Collection<string, PrefixCommand> = new Collection();
  private _prefixCommandsAliases: Collection<string, PrefixCommand> = new Collection();
  private _slashCommands: Collection<string, SlashCommand> = new Collection();
  private _events: Collection<string, Event> = new Collection();

  constructor(client: Client, options: SefaceKitOptions) {
    this._client = client;
    this._options = options;

    new CommandHandler(this._options.commandsIn, this._prefixCommands, this._prefixCommandsAliases, this._slashCommands, this);
    new EventHandler(this._options.eventsIn, this._events, this);
    new SefaceKitEvents('event/defaults', this._events, this);
  }

  public get client(): Client { return this._client; }
  public get options(): SefaceKitOptions { return this._options; }

  public get getPrefixCommands(): Collection<string, PrefixCommand> { return this._prefixCommands; }
  public get getPrefixCommandsAliases(): Collection<string, PrefixCommand> { return this._prefixCommandsAliases; }
  public get getSlashCommands(): Collection<string, SlashCommand> { return this._slashCommands; }

  public get getEvents(): Collection<string, Event> { return this._events; }
}

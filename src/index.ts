import { Client, Collection } from 'discord.js';

import { Event } from '@interfaces/Event';
import { SefaceKitOptions } from '@interfaces/SefaceKit';
import { PrefixCommand, SlashCommand } from '@interfaces/Command';
import { CommandHandler } from '@handlers/CommandHandler';
import { EventHandler } from '@handlers/EventHandler';
import { ClientHandler } from '@handlers/ClientHandler';
import { SefaceClient } from './client/SefaceClient';

export default class SefaceKit {
  private client: Client;
  private options: SefaceKitOptions;
  private prefixCommands: Collection<string, PrefixCommand> = new Collection();
  private prefixCommandsAliases: Collection<string, PrefixCommand> = new Collection();
  private slashCommands: Collection<string, SlashCommand> = new Collection();
  private events: Collection<string, Event> = new Collection();

  private sefaceClient: SefaceClient;

  constructor(client: Client, options: SefaceKitOptions) {
    this.client = client;
    this.options = options;
    this.sefaceClient = new SefaceClient(this.client);

    new CommandHandler(this.options.commandsIn, this.prefixCommands, this.prefixCommandsAliases, this.slashCommands, this);
    new EventHandler(this.options.eventsIn, this.events, this);
    new ClientHandler('client/events', this.events, this);
  }

  public get getClient(): Client { return this.client; }
  public get getOptions(): SefaceKitOptions { return this.options; }

  public get getPrefixCommands(): Collection<string, PrefixCommand> { return this.prefixCommands; }
  public get getPrefixCommandsAliases(): Collection<string, PrefixCommand> { return this.prefixCommandsAliases; }
  public get getSlashCommands(): Collection<string, SlashCommand> { return this.slashCommands; }

  public get getEvents(): Collection<string, Event> { return this.events; }

  public get utils(): SefaceClient { return this.sefaceClient; }
}

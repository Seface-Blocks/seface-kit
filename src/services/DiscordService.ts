import { Client, Collection } from 'discord.js';
import { SlashCommand } from 'seface-kit';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export class DiscordService {
  private rest: REST;
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.rest = this.rest = new REST({ version: '9' }).setToken(this.client.token);
  }

  public async registerGlobally(command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void> {
    collection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationCommands(this.client.user.id),
        { body: collection }
      );
    } catch (err) { console.error(err); }
  }

  public async registerGuild(guildId: string, command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void> {
    collection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationGuildCommands(this.client.user.id, guildId),
        { body: collection }
      );
    } catch (err) { console.error(err); }
  }
}

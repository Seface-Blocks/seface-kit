import { Client, Collection } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommand } from '@interfaces/Command';

export class SlashCommandService {
  private rest: REST;
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.rest = this.rest = new REST({ version: '9' }).setToken(this.client.token);
  }

  /** Registers the current command for all servers the bot is on. */
  public async addGlobally(command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void> {
    collection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationCommands(this.client.user.id),
        { body: collection }
      );
    } catch (err) { console.error(err); }
  }

  /** Registers the current command for a specific server. */
  public async addOnGuild(guildId: string, command: SlashCommand, collection: Collection<string, SlashCommand>): Promise<void> {
    collection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationGuildCommands(this.client.user.id, guildId),
        { body: collection }
      );
    } catch (err) { console.error(err); }
  }

  /** Registers the permissions for the current command in a specific server. */
  public async addPermissionsOnGuild(guildId: string, command: SlashCommand): Promise<void> {
    const fetchGuildCommands = await this.client.guilds.cache.get(guildId).commands.fetch();

    fetchGuildCommands.forEach(async (c) => {
      if(c.name === command.name) {
        await c.permissions.add({ permissions: command.permissions });
      }
    });
  }
}

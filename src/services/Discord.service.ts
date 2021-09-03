import { Collection } from 'discord.js';
import { SlashCommand } from '../interfaces/Command';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export class DiscordService {
  private rest: REST;
  private slashCommandCollection: Collection<string, SlashCommand>;

  constructor(rest: REST, collection: Collection<string, SlashCommand>) {
    this.rest = rest;
    this.slashCommandCollection = collection;
  }

  /**
   * Register a new slash command as application command.
   * @param clientId Application/Bot client id.
   * @param command The command to be registered.
   */
  public async registerCommandGlobally(clientId: string, command: SlashCommand): Promise<void> {
    this.slashCommandCollection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationCommands(clientId),
        { body: this.slashCommandCollection }
      );
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Register a new slash command in specific guilds.
   * @param clientId Application/Bot client id.
   * @param guildId The guild id to register the command on.
   * @param command The command to be registered.
   */
  public async registerCommandOnGuild(clientId: string, guildId: string, command: SlashCommand): Promise<void> {
    this.slashCommandCollection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: this.slashCommandCollection }
      );
    } catch (err) {
      console.error(err);
    }
  }
}

import { Collection } from 'discord.js';
import { SlashCommand } from '../interfaces/Command';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import chalk from 'chalk';

export class DiscordService {
  private rest: REST;
  private slashCommandCollection: Collection<string, SlashCommand>;

  constructor(rest: REST, collection: Collection<string, SlashCommand>) {
    this.rest = rest;
    this.slashCommandCollection = collection;
  }

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

  public async registerCommandOnGuild(clientId: string, guildId: string, command: SlashCommand): Promise<void> {
    this.slashCommandCollection.set(command.name, command);

    try {
      await this.rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: this.slashCommandCollection }
      );
    } catch (err) {
      console.error(`${chalk.bold.bgRed(' ERROR ')} You need to have your application added to the server with id ${chalk.underline(guildId)}`);
    }
  }
}

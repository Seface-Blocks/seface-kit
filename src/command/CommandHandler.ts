import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import SefaceKit from '..';

import Utils from '@utils/Utils';
import { PrefixCommand, SlashCommand } from '@interfaces/Command';

import { REST } from '@discordjs/rest';
import { DiscordService } from '../services/Discord.service';

export class CommandHandler {
  private instance: SefaceKit;
  private prefixCommandsCollection: Collection<string, PrefixCommand>;
  private prefixCommandsAliasesCollection: Collection<string, PrefixCommand>;
  private slashCommandsCollection: Collection<string, SlashCommand>;

  private rest: REST;
  private dsService: DiscordService;

  constructor(
    directory: string,
    prefixCommandsCollection: Collection<string, PrefixCommand>,
    prefixCommandsAliasesCollection: Collection<string, PrefixCommand>,
    slashCommandsCollection: Collection<string, SlashCommand>,
    instance: SefaceKit
  ) {

    this.instance = instance;
    this.prefixCommandsCollection = prefixCommandsCollection;
    this.prefixCommandsAliasesCollection = prefixCommandsAliasesCollection;
    this.slashCommandsCollection = slashCommandsCollection;

    this.rest = new REST({ version: '9' }).setToken(this.instance.client.token);
    this.dsService = new DiscordService(this.rest, this.slashCommandsCollection);

    this.readCommandsDir(directory);
  }

  /**
   * Read all commands from the given directory.
   * @param directory The directory where the commands are.
   */
  private readCommandsDir(directory: string) {
    const commandsDir = path.join(require.main.path, directory);

    fs.readdirSync(commandsDir).forEach((fileOrDir) => {
      const inCommandsDir = path.join(require.main.path, directory, fileOrDir);
      const commandsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inCommandsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readCommandsDir(commandsSubdir); }

      // Check the file extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { command }: { command: SlashCommand & PrefixCommand; } = require(inCommandsDir);

      // Check if the command is a SlashCommand.
      if (command.isSlashCommand) {
        this.registerSlashCommands(command);
        return;
      }

      this.registerPrefixCommands(command);
      this.registerPrefixCommandAliases(command);
    });
  }

  /**
   * Register a new Slash Command.
   * @param command The command to be registered.
   */
  private async registerSlashCommands(command: SlashCommand) {
    if (!command.registerOn) {
      await this.dsService.registerCommandGlobally(this.instance.client.user.id, command);
      return;
    }

    command.registerOn.forEach(async (guildId) => {
      if (guildId.length === 0) { return; }

      await this.dsService.registerCommandOnGuild(this.instance.client.user.id, guildId, command);
    });
  }

  /**
   * Register a new Prefix Command.
   * @param command The command to be registered.
   */
  private registerPrefixCommands(command: PrefixCommand) {
    this.prefixCommandsCollection.set(command.name, command);
  }

  /**
   * Register a new Prefix Command Alias.
   * @param command The command to be registered.
   */
  private registerPrefixCommandAliases(command: PrefixCommand) {
    if (command.aliases !== undefined) {
      if (command.aliases.length !== 0) {
        command.aliases.forEach((alias) => {
          if (alias.length === 0) { return; }

          this.prefixCommandsAliasesCollection.set(alias, command);
        });
      }
    }
  }
}

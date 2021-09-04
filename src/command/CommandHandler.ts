import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import SefaceKit from '..';
import Utils from '@utils/Utils';
import { PrefixCommand, SlashCommand } from '@interfaces/Command';
import { DiscordService } from '../service/DiscordService';

export class CommandHandler {
  private instance: SefaceKit;
  private prefixCommandsCollection: Collection<string, PrefixCommand>;
  private prefixCommandsAliasesCollection: Collection<string, PrefixCommand>;
  private slashCommandsCollection: Collection<string, SlashCommand>;

  private discordService: DiscordService;

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
    this.discordService = new DiscordService(this.instance.client);

    this.readCommandsDir(directory);
  }

  private readCommandsDir(directory: string) {
    const commandsDir = path.join(require.main.path, directory);

    fs.readdirSync(commandsDir).forEach(async (fileOrDir) => {
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

      this.registerPrefixCommandAliases(command);
      this.prefixCommandsCollection.set(command.name, command); // Register Prefix Commands
    });
  }

  private async registerSlashCommands(command: SlashCommand) {
    if (!command.guilds) { return; }

    if (typeof command.guilds === 'string') {
      await this.discordService.registerGuild(command.guilds, command, this.slashCommandsCollection);
    }

    if (typeof command.guilds === 'object') {
      command.guilds.forEach(async (guildId) => {
        await this.discordService.registerGuild(guildId, command, this.slashCommandsCollection);
      });
    }
  }

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

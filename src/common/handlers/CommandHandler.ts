import fs from 'fs';
import appRoot from 'app-root-path';
import path from 'path';
import { SefaceKit } from '../..';
import { Collection } from 'discord.js';
import { PrefixCommand, SlashCommand } from '@interfaces/Command';
import Utils from '@utils/Utils';
import { SlashCommandService } from '@services/SlashCommandService';

export class CommandHandler {
  private instance: SefaceKit;
  private prefixCommandsCollection: Collection<string, PrefixCommand>;
  private prefixCommandsAliasesCollection: Collection<string, PrefixCommand>;
  private slashCommandsCollection: Collection<string, SlashCommand>;

  private slashCommandService: SlashCommandService;

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
    this.slashCommandService = new SlashCommandService(this.instance.getClient);

    this.readCommands(directory);
  }

  /** Read all command fro a specific directory. */
  private readCommands(directory: string) {
    const dir = path.join(directory);

    fs.readdirSync(dir).forEach(async (fileOrDir) => {
      const inCommandsDir = path.join(directory, fileOrDir);
      const subdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inCommandsDir);

      if (dirStat.isDirectory()) { return this.readCommands(subdir); }
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { command }: { command: SlashCommand & PrefixCommand; } = require(inCommandsDir);

      if (command.isSlashCommand) {
        return this.registerSlashCommand(command);
      }

      if (command.ignoreRegister) { return; }

      this.registerPrefixCommandAliases(command);
      this.prefixCommandsCollection.set(command.name, command); // Register Prefix Commands
    });
  }

  /** Register all slash commands. */
  private async registerSlashCommand(command: SlashCommand): Promise<void> {
    if (!command.guilds) { return; }

    if (typeof command.guilds === 'string') {
      await this.slashCommandService.addOnGuild(command.guilds, command, this.slashCommandsCollection);
      await this.slashCommandService.addPermissionsOnGuild(command.guilds, command);
    }

    if (typeof command.guilds === 'object') {
      command.guilds.forEach(async (guildId) => {
        await this.slashCommandService.addOnGuild(guildId, command, this.slashCommandsCollection);
        await this.slashCommandService.addPermissionsOnGuild(guildId, command);
      });
    }
  }

  /** Register all prefix commands aliases. */
  private registerPrefixCommandAliases(command: PrefixCommand): void {
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

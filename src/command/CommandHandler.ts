import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import Utils from '@utils/Utils';
import { Command } from '@interfaces/Command';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export class CommandHandler {
  private commandsCollection: Collection<string, Command>;
  private commandsAliasesCollection: Collection<string, Command>;
  private slashCommandsCollection: Collection<string, Command>;
  private restDiscordAPI: REST;

  constructor(
    directory: string,
    commandsCollection: Collection<string, Command>,
    commandsAliasesCollection: Collection<string, Command>,
    slashCommandsCollection: Collection<string, Command>
  ) {

    this.commandsCollection = commandsCollection;
    this.commandsAliasesCollection = commandsAliasesCollection;
    this.slashCommandsCollection = slashCommandsCollection;
    this.restDiscordAPI = new REST({ version: '9' }).setToken('Nzg4MjQ5ODIwMDM1ODA5Mjkw.X9gw2g.iVcLAsOY4fOCyFgdg4mYvJFM9yM');

    this.readCommands(directory);
  }

  /**
   * Reads all commands in the directory and registers them.
   * @param directory The directory where the commands are.
   */
  private readCommands(directory: string) {
    const commandsDir = path.join(require.main.path, directory);

    fs.readdirSync(commandsDir).forEach((fileOrDir) => {
      const inCommandsDir = path.join(require.main.path, directory, fileOrDir);
      const commandsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inCommandsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readCommands(commandsSubdir); }

      // Check if the file is a .ts or .js file.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { command }: { command: Command; } = require(inCommandsDir);

      // If the command are marked as slash command, they will be registered.
      if (command.isSlashCommand) {
        this.registerSlashCommands(command);
        return;
      }

      this.registerCommands(command);
      this.registerAliases(command);
    });

  }

  private async registerSlashCommands(command: Command) {
    this.slashCommandsCollection.set(command.name, command);

    try {
      await this.restDiscordAPI.put(
        Routes.applicationGuildCommands('788249820035809290', '880655196986949682'),
        { body: this.slashCommandsCollection }
      );

      console.log('Comando registrado.');
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Register every command in the Commands Collection.
   * @param name The command name.
   * @param command The command object.
   */
  private registerCommands(command: Command) {
    this.commandsCollection.set(command.name, command);
  }

  /**
   * Register command aliases in the Commands Aliases Collection.
   * @param command The command object.
   */
  private registerAliases(command: Command) {
    if (command.aliases !== undefined) {
      if (command.aliases.length !== 0) {
        command.aliases.forEach((alias) => {
          if (alias.length === 0) { return; }

          this.commandsAliasesCollection.set(alias, command);
        });
      }
    }
  }
}

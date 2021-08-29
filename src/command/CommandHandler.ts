import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { Command } from '../interfaces/Command';

export class CommandHandler {
  private instance: SefaceKit;
  private commandsCollection: Collection<string, Command>;
  private commandsAliasesCollection: Collection<string, Command>;

  constructor(
    directory: string,
    commandsCollection: Collection<string, Command>,
    commandsAliasesCollection: Collection<string, Command>,
    instance: SefaceKit
  ) {

    this.instance = instance;
    this.commandsCollection = commandsCollection;
    this.commandsAliasesCollection = commandsAliasesCollection;

    this.init(directory);
  }

  /** Initialize the Command Handler. */
  private init(directory: string) {
    const commandsDir = path.join(require.main.path, directory);

    fs.readdirSync(commandsDir).forEach((fileOrDir) => {
      const inCommandsDir = path.join(require.main.path, directory, fileOrDir);
      const commandsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inCommandsDir);

      // Loop the function to call everytime when the readdirSync enter in another folder.
      if (dirStat.isDirectory()) { return this.init(commandsSubdir); }

      // Checks if the file has a valid extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const fileName = path.parse(inCommandsDir);
      const { command }: { command: Command; } = require(inCommandsDir);

      this.registerCommands(fileName.name, command);
      this.registerAliases(command);

    });
  }

  /**
   * Register every command in the Commands Collection.
   * 
   * @param name The command name.
   * @param command The command object.
   */
  private registerCommands(name: string, command: Command) {
    this.commandsCollection.set(name, command);
  }

  /**
   * Register command aliases in the Commands Aliases Collection.
   * 
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

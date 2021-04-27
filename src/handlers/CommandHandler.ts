import fs from 'fs';
import path from 'path';
import Chalk from 'chalk';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { messages } from '../config.json';
import { Command } from '../utils/interfaces/Command';
import { HandlerType } from '../utils/enums/HandlerTypes';

export class CommandHandler {
  private instance: SefaceKit;
  private _commandsCollection: Collection<string, Command>;
  private _commandsAliasesCollection: Collection<string, Command>;

  constructor(directory: string, commandsCollection: Collection<string, Command>,
    commandsAliasesCollection: Collection<string, Command>, instance: SefaceKit) {

    this.instance = instance;
    this._commandsCollection = commandsCollection;
    this._commandsAliasesCollection = commandsAliasesCollection;

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
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) {
        if (this.instance.options.showWarns) {
          console.warn(`${Chalk.bold.yellow('WARNING')} ${messages.invalidExtension
            .replace('{file}', Chalk.magenta(fileOrDir))}`
            .replace('{handlerType}', Chalk.magenta(HandlerType[this.constructor.name])));
        }

        return;
      }

      const fileName = path.parse(inCommandsDir);
      const { command }: { command: Command; } = require(inCommandsDir);

      // Register the aliases (if have)
      if (command.aliases !== undefined) {
        if (command.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            if(alias.length === 0) { return; }

            this._commandsAliasesCollection.set(alias, command);
          });
        }
      }

      // Register the command
      this._commandsCollection.set(fileName.name, command);
    });
  }
}

import fs from 'fs';
import path from 'path';
import Chalk from 'chalk';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { messages } from '../config.json';
import { Command } from '../interfaces/Command';
import { HandlerType } from '../utils/enums/HandlerTypes';

export class CommandHandler {
  private instance: SefaceKit;
  private _commandsCollection: Collection<string, Command>;

  constructor(directory: string, collection: Collection<string, Command>, instance: SefaceKit) {
    this.instance = instance;
    this._commandsCollection = collection;

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

      const { command } = require(inCommandsDir);
      this._commandsCollection.set(command.name, command);
    });
  }
}

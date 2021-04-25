import fs from 'fs';
import path from 'path';
import Chalk from 'chalk';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { messages } from '../config.json';
import { Command } from '../interfaces/Command';
import chalk from 'chalk';

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
    const cmdDir = path.join(require.main.path, directory);

    fs.readdirSync(cmdDir).forEach((fileOrDir) => {
      const insideCmdDir = path.join(require.main.path, directory, fileOrDir);
      const cmdSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(insideCmdDir);

      // Loop the function to call everytime when the readdirSync enter in another folder.
      if (dirStat.isDirectory()) { return this.init(cmdSubdir); }

      // Checks if the file has a valid extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) {
        if (this.instance.options.showWarns) {
          console.warn(`${Chalk.bold.yellow('WARNING')} ${messages.invalidExtension.replace('{file}', chalk.magenta(fileOrDir))}`);
        }

        return;
      }

      const { command } = require(insideCmdDir);
      this._commandsCollection.set(command.name, command);
    });
  }
};

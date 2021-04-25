import path from 'path';
import fs from 'fs';
import { Collection } from 'discord.js';
import { Command } from '../interfaces/Command';

export class CommandHandler {
  private _commandsCollection: Collection<string, Command>;

  constructor(directory: string, collection: Collection<string, Command>) {
    this._commandsCollection = collection;
    this.init(directory);
  }

  /**
   * Initialize the Command Handler.
   *
   * @example
   * .
   * ├─ commands        => Main commands directory.
   * │  └─ fun          => Subdirectory.
   * │     └─ memes.ts  => Command file.
   * └─ help.ts         => Command file.
   *
   * Bellow area a example about how the file system works.
   */
  private init(directory: string) {
    const cmdDir = path.join(require.main.path, directory);

    fs.readdirSync(cmdDir).forEach((fileOrDir) => {
      const insideCmdDir = path.join(require.main.path, directory, fileOrDir);
      const cmdSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(insideCmdDir);

      // Loop the function to call everytime where the readdirSync enter in another folder.
      if (dirStat.isDirectory()) {
        return this.init(cmdSubdir);
      }

      const { command } = require(insideCmdDir);
      this._commandsCollection.set(command.name, command);
    });
  }
}

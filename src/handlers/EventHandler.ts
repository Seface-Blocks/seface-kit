import fs from 'fs';
import path from 'path';
import Chalk from 'chalk';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { Event } from '../interfaces/Event';
import { messages } from '../config.json';
import { HandlerType } from '../utils/enums/HandlerTypes';

export class EventHandler {
  private instance: SefaceKit;
  private _eventsCollection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._eventsCollection = collection;

    this.init(directory);
  }

  /** Initialize the Event Handler. */
  private init(directory: string) {
    const eventsDir = path.join(require.main.path, directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(require.main.path, directory, fileOrDir);
      const eventsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop the function to call everytime when the readdirSync enter in another folder.
      if (dirStat.isDirectory()) { return this.init(eventsSubdir); }

      // Checks if the file has a valid extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) {
        if (this.instance.options.showWarns) {
          console.warn(`${Chalk.bold.yellow('WARNING')} ${messages.invalidExtension
            .replace('{file}', Chalk.magenta(fileOrDir))}`
            .replace('{handlerType}', Chalk.magenta(HandlerType[this.constructor.name])));
        }

        return;
      }

      const { event }: any = await import(inEventsDir);

      this._eventsCollection.set(event.name, event);
      this.instance.client.on(event.name, event.run.bind(null, this.instance.client, this.instance));
    });
  }
}

import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import { Event } from '../utils/interfaces/Event';
import Utils from '../utils/Utils';
import Chalk from 'chalk';
import { messages } from '../config.json';
import { HandlerType } from '../utils/enums/HandlerTypes';

/** An EventHandler to read and register all events in the seface-kit module. */
export class ModuleEventHandler {
  private instance: SefaceKit;
  private _eventsCollection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._eventsCollection = collection;

    this.init(directory);
  }

  /** Initialize the Event Handler. */
  private init(directory: string) {
    const eventsDir = path.join(__dirname, '..', directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(__dirname, '..', directory, fileOrDir);
      const eventsSubdir = path.join('..', directory, fileOrDir);
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

      const { moduleEvent }: { moduleEvent: Event; } = await import(inEventsDir);

      this._eventsCollection.set(moduleEvent.name, moduleEvent);
      this.instance.client.on(moduleEvent.name, moduleEvent.run.bind(null, this.instance.client, this.instance));
    });
  }
}

import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { Event } from '../interfaces/Event';

/** An EventHandler to read and register all events in the project. */
export class SefaceKitEvents {
  private instance: SefaceKit;
  private _sefaceKitEventsCollection: Collection<string, Event>;

  /**
   * @param directory The directory where the events are.
   * @param collection The collection where the events will be registered.
   * @param instance The instance of the SefaceKit.
   */
  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._sefaceKitEventsCollection = collection;

    this.init(directory);
  }

  /**
   * @param directory The directory where the events are.
   */
  private init(directory: string) {
    const eventsDir = path.join(__dirname, '..', directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(__dirname, '..', directory, fileOrDir);
      const eventsSubdir = path.join('..', directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop the function to call everytime when the readdirSync enter in another folder.
      if (dirStat.isDirectory()) { return this.init(eventsSubdir); }

      // Checks if the file has a valid extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { moduleEvent }: { moduleEvent: Event; } = await import(inEventsDir);

      /* moduleEvent.name */
      this._sefaceKitEventsCollection.set(moduleEvent.name, moduleEvent);
      this.instance.client.on(moduleEvent.name, moduleEvent.run.bind(null, this.instance.client, this.instance));
    });
  }
}

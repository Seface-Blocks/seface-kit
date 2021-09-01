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

    this.readSefaceKitEvents(directory);
  }

  /**
   * Reads all Seface Kit events in the directory and registers them.
   * @param directory The directory where the events are.
   */
  private readSefaceKitEvents(directory: string) {
    const eventsDir = path.join(__dirname, '..', directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(__dirname, '..', directory, fileOrDir);
      const eventsSubdir = path.join('..', directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readSefaceKitEvents(eventsSubdir); }

      // Check if the file is a .ts or .js file.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { moduleEvent }: { moduleEvent: Event; } = await import(inEventsDir);

      /* moduleEvent.name */
      this._sefaceKitEventsCollection.set(moduleEvent.name, moduleEvent);
      this.instance.client.on(moduleEvent.name, moduleEvent.execute.bind(null, this.instance.client, this.instance));
    });
  }
}

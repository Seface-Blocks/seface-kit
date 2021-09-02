import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import Utils from '../utils/Utils';
import { Event } from '../interfaces/Event';

export class EventHandler {
  private instance: SefaceKit;
  private _eventsCollection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._eventsCollection = collection;

    this.readEventsDir(directory);
  }

  /**
   * Reads all events in the directory and registers them.
   * @param directory The directory where the events are.
   */
  private readEventsDir(directory: string) {
    const eventsDir = path.join(require.main.path, directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(require.main.path, directory, fileOrDir);
      const eventsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readEventsDir(eventsSubdir); }

      // Check the file extension.
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { event }: { event: Event; } = await import(inEventsDir);

      this.registerEvent(event);
      this.instance.client.on(event.name, event.execute.bind(null, this.instance.client, this.instance));
    });
  }

  /**
   * Register a new Event.
   * @param event The event to be registered.
   */
  private registerEvent(event: Event) {
    this._eventsCollection.set(event.name, event);
  }
}

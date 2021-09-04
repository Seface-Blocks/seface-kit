import fs from 'fs';
import path from 'path';
import SefaceKit from '..';
import SefaceKitUtils from '@utils/SefaceKitUtils';
import { Collection } from 'discord.js';
import { Event } from '@interfaces/Event';

export class EventHandler {
  private instance: SefaceKit;
  private _eventsCollection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._eventsCollection = collection;

    this.readEventsDir(directory);
  }

  private readEventsDir(directory: string) {
    const eventsDir = path.join(require.main.path, directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(require.main.path, directory, fileOrDir);
      const eventsSubdir = path.join(directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readEventsDir(eventsSubdir); }

      // Check the file extension.
      if (!SefaceKitUtils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { event }: { event: Event; } = await import(inEventsDir);

      this.registerEvent(event);
      this.instance.client.on(event.name, event.execute.bind(null, this.instance.client, this.instance));
    });
  }

  private registerEvent(event: Event) {
    this._eventsCollection.set(event.name, event);
  }
}

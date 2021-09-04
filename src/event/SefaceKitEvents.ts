import fs from 'fs';
import path from 'path';
import SefaceKit from '..';
import SefaceKitUtils from '@utils/SefaceKitUtils';
import { Collection } from 'discord.js';
import { Event } from '@interfaces/Event';

export class SefaceKitEvents {
  private instance: SefaceKit;
  private _sefaceKitEventsCollection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this._sefaceKitEventsCollection = collection;

    this.readSefaceKitEvents(directory);
  }

  private readSefaceKitEvents(directory: string) {
    const eventsDir = path.join(__dirname, '..', directory);

    fs.readdirSync(eventsDir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(__dirname, '..', directory, fileOrDir);
      const eventsSubdir = path.join('..', directory, fileOrDir);
      const dirStat = fs.lstatSync(inEventsDir);

      // Loop this function while it's a directory.
      if (dirStat.isDirectory()) { return this.readSefaceKitEvents(eventsSubdir); }

      // Check the file extension.
      if (!SefaceKitUtils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { moduleEvent }: { moduleEvent: Event; } = await import(inEventsDir);

      this.registerSefaceKitEvent(moduleEvent);
      this.instance.client.on(moduleEvent.name, moduleEvent.execute.bind(null, this.instance.client, this.instance));
    });
  }

  private registerSefaceKitEvent(event: Event) {
    this._sefaceKitEventsCollection.set(event.name, event);
  }
}

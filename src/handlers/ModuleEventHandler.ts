import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

import SefaceKit from '..';
import { Event } from '../interfaces/Event';

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

      const { moduleEvent }: any = await import(inEventsDir);

      this._eventsCollection.set(moduleEvent.name, moduleEvent);
      this.instance.client.on(moduleEvent.name, moduleEvent.run.bind(null, this.instance.client, this.instance));
    });
  }
}

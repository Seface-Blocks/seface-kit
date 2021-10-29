import fs from 'fs';
import path from 'path';
import SefaceKit from '../..';
import { Collection } from 'discord.js';
import { Event } from '@interfaces/Event';
import Utils from '@utils/Utils';

export class EventHandler {
  private instance: SefaceKit;
  private collection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this.collection = collection;

    this.readEvents(directory);
  }

  /** Read all events from a specific directory. */
  private readEvents(directory: string): void {
    const dir = path.join(require.main.path, directory);
  
    if (!fs.existsSync(dir)) { return; }

    fs.readdirSync(dir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(require.main.path, directory, fileOrDir);
      const subdir = path.join(directory, fileOrDir);
      const stat = fs.lstatSync(inEventsDir);

      if (stat.isDirectory()) { return this.readEvents(subdir); }
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { event }: { event: Event; } = await import(inEventsDir);
      this.registerEvent(event);
    });
  }

  /** Register all events. */
  private registerEvent(event: Event): void {
    this.collection.set(event.name, event);
    this.instance.getClient.on(event.name, event.execute.bind(null, this.instance.getClient, this.instance));
  }
}

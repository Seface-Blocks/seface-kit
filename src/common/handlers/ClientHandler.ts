import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import { Event } from '@interfaces/Event';
import Utils from '@utils/Utils';
import SefaceKit from '../..';

export class ClientHandler {
  private instance: SefaceKit;
  private collection: Collection<string, Event>;

  constructor(directory: string, collection: Collection<string, Event>, instance: SefaceKit) {
    this.instance = instance;
    this.collection = collection;

    this.readClientEvents(directory);
  }

  /** Read all events from a the seface-kit client. */
  private readClientEvents(directory: string) {
    const dir = path.join(__dirname, '../..', directory);

    fs.readdirSync(dir).forEach(async (fileOrDir) => {
      const inEventsDir = path.join(__dirname, '../..', directory, fileOrDir);
      const subdir = path.join('../..', directory, fileOrDir);
      const stat = fs.lstatSync(inEventsDir);

      if (stat.isDirectory()) { return this.readClientEvents(subdir); }
      if (!Utils.checkFileExtension(fileOrDir, ['.ts', '.js'])) { return; }

      const { event }: { event: Event; } = await import(inEventsDir);
      this.registerSefaceKitEvent(event);
    });
  }

  /** Register all events. */
  private registerSefaceKitEvent(event: Event) {
    this.collection.set(event.name, event);
    this.instance.getClient.on(event.name, event.execute.bind(null, this.instance.getClient, this.instance));
  }
}

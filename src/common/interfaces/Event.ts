import { Client, ClientEvents } from 'discord.js';
import { SefaceKit } from '../..';

export interface EventExecutor {
  (client: Client, instance: SefaceKit, ...args: any[]): Promise<void>;
}

export interface Event {
  name: keyof ClientEvents | string;
  execute: EventExecutor;
}

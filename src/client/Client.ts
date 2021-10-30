import Discord from 'discord.js';
import { Channel } from '@client/Channel';

export class Client {
  public channel: Channel;

  constructor(client: Discord.Client) {
    this.channel = new Channel(client);
  }
}

import Discord from 'discord.js';

export class Channel {
  private client: Discord.Client;

  constructor(client: Discord.Client) {
    this.client = client;
  }
}

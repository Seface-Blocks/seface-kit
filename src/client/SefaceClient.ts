import Discord from 'discord.js';
import { Guild } from '@client/Guild';

export class SefaceClient {
  public guild: Guild;

  constructor(client: Discord.Client) {
    this.guild = new Guild(client);
  }
}

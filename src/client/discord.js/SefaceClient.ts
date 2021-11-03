import Discord from 'discord.js';
import { Guild } from '@client/discord.js/Guild';

export class SefaceClient {
  public guild: Guild;

  constructor(client: Discord.Client) {
    this.guild = new Guild(client);
  }
}

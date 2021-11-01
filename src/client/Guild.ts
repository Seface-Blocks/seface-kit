import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';
import { Category } from '@client/Category';
import { Channel } from '@client/Channel';
import { Role } from '@client/Role';
import { Emoji } from '@client/Emoji';

export class Guild {
  private client: Discord.Client;
  public category: Category = new Category();
  public channel: Channel = new Channel();
  public role: Role = new Role();
  public emoji: Emoji = new Emoji();

  constructor(client: Discord.Client) {
    this.client = client;
  }

  public async getGuildByName(name: string): Promise<Discord.Guild> {
    return new Promise((resolve, reject) => {
      const guild = this.client.guilds.cache.find((g) => g.name === name);

      if (!guild) {
        reject(new Error(Messages.GUILD_NOT_FOUND.replace('{GUILD}', chalk.yellow(name))));
      }

      resolve(guild);
    });
  }

  public async getGuildById(id: string): Promise<Discord.Guild> {
    return new Promise((resolve, reject) => {
      const guild = this.client.guilds.cache.get(id);

      if (!guild) {
        reject(new Error(Messages.GUILD_NOT_FOUND.replace('{GUILD}', chalk.yellow(id))));
      }

      resolve(guild);
    });
  }
}

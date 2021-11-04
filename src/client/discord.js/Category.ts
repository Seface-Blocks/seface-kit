import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Category {
  private categories: Discord.CategoryChannel[] = [];

  public async getCategories(guild: Discord.Guild): Promise<Discord.CategoryChannel[]> {
    return new Promise<Discord.CategoryChannel[]>((resolve, reject) => {
      guild.channels.cache.forEach((c) => {
        if (c.type === 'GUILD_CATEGORY') {
          this.categories.push(c as Discord.CategoryChannel);
        }
      });

      if(this.categories.length === 0) {
        reject(new Error(Messages.CATEGORIES_NOT_FOUND));
      }

      resolve(this.categories);
    });
  }

  public async getCategoryByName(name: string, guild: Discord.Guild): Promise<Discord.CategoryChannel> {
    return new Promise<Discord.CategoryChannel>((resolve, reject) => {
      const channel = guild.channels.cache.find(c => c.name === name);

      if (channel.type === 'GUILD_CATEGORY') {
        resolve(channel as Discord.CategoryChannel);
      }

      reject(new Error(Messages.CATEGORY_NOT_FOUND.replace('{CATEGORY}', chalk.yellow(name))));
    });
  }

  public async getCategoryById(id: Discord.Snowflake, guild: Discord.Guild): Promise<Discord.CategoryChannel> {
    return new Promise<Discord.CategoryChannel>((resolve, reject) => {
      const channel = guild.channels.cache.get(id);

      if (channel.type === 'GUILD_CATEGORY') {
        resolve(channel as Discord.CategoryChannel);
      }

      reject(new Error(Messages.CATEGORY_NOT_FOUND.replace('{CATEGORY}', chalk.yellow(id))));
    });
  }
}

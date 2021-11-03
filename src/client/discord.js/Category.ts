import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Category {
  
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

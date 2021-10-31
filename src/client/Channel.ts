import Discord, { TextChannel } from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Channel {

  // TEXT CHANNEL
  public async getTextChannelByName(name: string, guild: Discord.Guild): Promise<Discord.TextChannel> {
    return new Promise<Discord.TextChannel>((resolve, reject) => {
      name = name.replace(/\s/g, '_');
      const channel = guild.channels.cache.find(c => c.name === name);

      if (channel.type !== 'GUILD_TEXT') {
        reject(new Error(Messages.CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(name))));
      }

      resolve(channel as TextChannel);
    });
  }

  public async getTextChannelById(id: Discord.Snowflake, guild: Discord.Guild): Promise<Discord.TextChannel> {
    return new Promise<Discord.TextChannel>((resolve, reject) => {
      const channel = guild.channels.cache.get(id);

      if (channel.type !== 'GUILD_TEXT') {
        reject(new Error(Messages.CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(id))));
      }

      resolve(channel as TextChannel);
    });
  }
}

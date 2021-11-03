import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Emoji {
  
  public async getEmojiByName(name: string, guild: Discord.Guild): Promise<Discord.Emoji> {
    return new Promise<Discord.Emoji>((resolve, reject) => {
      const emoji = guild.emojis.cache.find(emoji => emoji.name === name);

      if (!emoji) {
        reject(new Error(Messages.EMOJI_NOT_FOUND.replace('{EMOTE}', chalk.yellow(name))));
      }

      resolve(emoji);
    });
  }

  public async getEmojiById(id: string, guild: Discord.Guild): Promise<Discord.Emoji> {
    return new Promise<Discord.Emoji>((resolve, reject) => {
      const emoji = guild.emojis.cache.get(id);

      if (!emoji) {
        reject(new Error(Messages.EMOJI_NOT_FOUND.replace('{EMOTE}', chalk.yellow(id))));
      }

      resolve(emoji);
    });
  }
}

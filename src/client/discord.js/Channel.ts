import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Channel {
  private textChannels: Discord.TextChannel[] = [];
  private voiceChannels: Discord.VoiceChannel[] = [];
  private stageChannels: Discord.StageChannel[] = [];
  
  // TEXT CHANNEL
  public async getTextChannels(guild: Discord.Guild): Promise<Discord.TextChannel[]> {
    return new Promise<Discord.TextChannel[]>((resolve, reject) => {
      guild.channels.cache.forEach(c => {
        if (c.type === 'GUILD_TEXT') {
          this.textChannels.push(c as Discord.TextChannel);
        }
      });

      if(this.textChannels.length === 0) {
        reject(new Error(Messages.TEXT_CHANNELS_NOT_FOUND));
      }

      resolve(this.textChannels);
    });
  }

  public async getTextChannelByName(name: string, guild: Discord.Guild): Promise<Discord.TextChannel> {
    return new Promise<Discord.TextChannel>((resolve, reject) => {
      name = name.replace(/\s/g, '-');
      const channel = guild.channels.cache.find(c => c.name === name);

      if (channel.type !== 'GUILD_TEXT') {
        reject(new Error(Messages.TEXT_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(name))));
      }

      resolve(channel as Discord.TextChannel);
    });
  }

  public async getTextChannelById(id: Discord.Snowflake, guild: Discord.Guild): Promise<Discord.TextChannel> {
    return new Promise<Discord.TextChannel>((resolve, reject) => {
      const channel = guild.channels.cache.get(id);

      if (channel.type !== 'GUILD_TEXT') {
        reject(new Error(Messages.TEXT_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(id))));
      }

      resolve(channel as Discord.TextChannel);
    });
  }

  // VOICE CHANNEL
  public async getVoiceChannels(guild: Discord.Guild): Promise<Discord.VoiceChannel[]> {
    return new Promise<Discord.VoiceChannel[]>((resolve, reject) => {
      guild.channels.cache.forEach(c => {
        if (c.type === 'GUILD_VOICE') {
          this.voiceChannels.push(c as Discord.VoiceChannel);
        }
      });

      if (this.textChannels.length === 0) {
        reject(new Error(Messages.VOICE_CHANNELS_NOT_FOUND));
      }

      resolve(this.voiceChannels);
    });
  }

  public async getVoiceChannelByName(name: string, guild: Discord.Guild): Promise<Discord.VoiceChannel> {
    return new Promise<Discord.VoiceChannel>((resolve, reject) => {
      const channel = guild.channels.cache.find(c => c.name === name);

      if (channel.type !== 'GUILD_VOICE') {
        reject(new Error(Messages.VOICE_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(name))));
      }

      resolve(channel as Discord.VoiceChannel);
    });
  }

  public async getVoiceChannelById(id: Discord.Snowflake, guild: Discord.Guild): Promise<Discord.VoiceChannel> {
    return new Promise<Discord.VoiceChannel>((resolve, reject) => {
      const channel = guild.channels.cache.get(id);

      if (channel.type !== 'GUILD_VOICE') {
        reject(new Error(Messages.VOICE_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(id))));
      }

      resolve(channel as Discord.VoiceChannel);
    });
  }

  // STAGE CHANNEL
  public async getStageChannels(guild: Discord.Guild): Promise<Discord.StageChannel[]> {
    return new Promise<Discord.StageChannel[]>((resolve, reject) => {
      guild.channels.cache.forEach(c => {
        if (c.type === 'GUILD_STAGE_VOICE') {
          this.stageChannels.push(c as Discord.StageChannel);
        }
      });

      if (this.textChannels.length === 0) {
        reject(new Error(Messages.STAGE_CHANNELS_NOT_FOUND));
      }

      resolve(this.stageChannels);
    });
  }

  public async getStageChannelByName(name: string, guild: Discord.Guild): Promise<Discord.StageChannel> {
    return new Promise<Discord.StageChannel>((resolve, reject) => {
      const channel = guild.channels.cache.find(c => c.name === name);

      if (channel.type !== 'GUILD_STAGE_VOICE') {
        reject(new Error(Messages.STAGE_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(name))));
      }

      resolve(channel as Discord.StageChannel);
    });
  }

  public async getStageChannelById(id: Discord.Snowflake, guild: Discord.Guild): Promise<Discord.StageChannel> {
    return new Promise<Discord.StageChannel>((resolve, reject) => {
      const channel = guild.channels.cache.find(c => c.name === id);

      if (channel.type !== 'GUILD_STAGE_VOICE') {
        reject(new Error(Messages.STAGE_CHANNEL_NOT_FOUND.replace('{CHANNEL}', chalk.yellow(id))));
      }

      resolve(channel as Discord.StageChannel);
    });
  }
}

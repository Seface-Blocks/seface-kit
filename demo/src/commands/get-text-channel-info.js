const Config = require('../config.json');
const { Client, Message, MessageEmbed } = require('discord.js');
const { SefaceKit } = require('seface-kit');

const command = {
  name: 'get-text-channel-info',
  description: 'Returns informations about a text channel.',

  /**
   * It is highly recommended to use TypeScript for better typing.
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   * @param {SefaceKit} instance 
   */
  execute: async (client, message, args, instance) => {
    const guild = await instance.utils.guild.getGuildByName(Config.GUILD_NAME);
    const channel = await instance.utils.guild.channel.getTextChannelByName(Config.TEXT_CHANNEL_NAME, guild);

    const embedMessage = new MessageEmbed()
      .setTitle(channel.name)
      .setDescription(`This channel are in the guild **${channel.guild.name}**.`)
      .addFields(
        { name: 'Creator Website', value: 'https://llgava.net', inline: true },
        { name: 'Creator Twitter', value: '@llgava', inline: true }
      )
      .setThumbnail(guild.iconURL());

    message.reply({ embeds: [embedMessage] });
  }
};

module.exports = { command };

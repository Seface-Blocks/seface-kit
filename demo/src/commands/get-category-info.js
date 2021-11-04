const Config = require('../config.json');
const { Client, Message, MessageEmbed } = require('discord.js');
const { SefaceKit } = require('seface-kit');

const command = {
  name: 'get-category-info',
  description: 'Returns informations about a category.',

  /**
   * It is highly recommended to use TypeScript for better typing.
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   * @param {SefaceKit} instance 
   */
  execute: async (client, message, args, instance) => {
    const guild = await instance.utils.guild.getGuildByName(Config.GUILD_NAME);
    const category = await instance.utils.guild.category.getCategoryByName(Config.CATEGORY_NAME, guild);

    const embedMessage = new MessageEmbed()
      .setTitle(category.name)
      .setDescription(`This category are in the guild **${category.guild.name}**.`)
      .addFields(
        { name: 'Creator Website', value: 'https://llgava.net', inline: true },
        { name: 'Creator Twitter', value: '@llgava', inline: true }
      )
      .setThumbnail(guild.iconURL());

    message.reply({ embeds: [embedMessage] });
  }
};

module.exports = { command };

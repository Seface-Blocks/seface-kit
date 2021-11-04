const Config = require('../config.json');
const { Client, Message, MessageEmbed } = require('discord.js');
const { SefaceKit } = require('seface-kit');

const command = {
  name: 'get-role-info',
  description: 'Returns informations about a role.',

  /**
   * It is highly recommended to use TypeScript for better typing.
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   * @param {SefaceKit} instance 
   */
  execute: async (client, message, args, instance) => {
    const guild = await instance.utils.guild.getGuildByName(Config.GUILD_NAME);
    const role = await instance.utils.guild.role.getRoleByName(Config.ROLE_NAME, guild);

    const embedMessage = new MessageEmbed()
      .setTitle(role.name)
      .setDescription(`This channel are in the guild **${role.guild.name}**.`)
      .addFields(
        { name: 'Creator Website', value: 'https://llgava.net', inline: true },
        { name: 'Creator Twitter', value: '@llgava', inline: true }
      )
      .setThumbnail(guild.iconURL());

    message.reply({ embeds: [embedMessage] });
  }
};

module.exports = { command };

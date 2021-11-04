const { Client, Message, MessageEmbed } = require('discord.js');
const { SefaceKit } = require('seface-kit');

const command = {
  name: 'get-guild-info',
  description: 'none',

  /**
   * It is highly recommended to use TypeScript for better typing.
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   * @param {SefaceKit} instance 
   */
  execute: async (client, message, args, instance) => {
    const guild = await instance.utils.guild.getGuildByName('llgava');
    const embedMessage = new MessageEmbed()
      .setTitle(guild.name)
      .setDescription(`This guild has the total of **${guild.memberCount}** members.`)
      .addFields(
        { name: 'Creator Website', value: 'https://llgava.net', inline: true },
        { name: 'Creator Twitter', value: '@llgava', inline: true }
      )
      .setThumbnail(guild.iconURL());

    message.reply({ embeds: [embedMessage] });
  }
};

module.exports = { command };

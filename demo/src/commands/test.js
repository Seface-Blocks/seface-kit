const command = {
  name: 'test',
  description: 'none',
  options: [],
  guilds: ['788243757886996510'],
  isSlashCommand: true,
  execute: async (client, interaction, sender, instance) => {
    const g = await instance.utils.guild.getGuildByName('llgava');
    const c = await instance.utils.guild.channel.getStageChannels(g);

    console.log(c);
    interaction.reply(':test_tube: Test command executed!');
  }
};

module.exports = { command };

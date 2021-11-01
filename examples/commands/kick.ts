import { SlashCommand } from 'seface-kit';

export const command: SlashCommand = {
  name: 'kick',
  description: 'Kick members from the server.',
  options: [
    // Type definitions can be found here: https://bit.ly/3n117So
    { name: 'user', description: 'User to be kicked', type: 6, required: true },
    { name: 'reason', description: 'Reason for the kick', type: 3 }
  ],
  guilds: 'GUILD_ID',
  isSlashCommand: true,

  execute: async (client, interaction, sender, instance) => {
    const guild = await instance.utils.guild.getGuildByName('GUILD_ID');

    // Fetch Options Values
    const user = interaction.options.getUser('user'); // Need convert the User to GuildMember type.
    const reason = interaction.options.getString('reason');

    const userToKick = guild.members.cache.get(user.id);

    if (!sender.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('You don\'t have permission to use this command!');
    }

    if (!userToKick.kickable) {
      return interaction.reply('You can\'t kick this user!');
    }

    userToKick.kick(reason);
    interaction.reply('User kicked!');
  }
};

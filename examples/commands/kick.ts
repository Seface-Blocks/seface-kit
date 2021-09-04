import { CommandInteraction, GuildMember, User } from 'discord.js';
import { SlashCommand } from 'seface-kit';

export const command: SlashCommand = {
  name: 'kick',
  description: 'Kick a user from the server.',
  options: [
    { name: 'user', description: 'User to be kicked.', type: 6, required: true },
    { name: 'reason', description: 'Reason for the kick.', type: 3 },
  ],
  guilds: '910847586061986462',
  isSlashCommand: true,
  execute: async (client, interaction: CommandInteraction) => {
    const optUser: User = interaction.options.getUser('user');
    const optReason: string = interaction.options.getString('reason');

    const sender: GuildMember = interaction.guild.members.cache.get(interaction.user.id);
    const user: GuildMember = interaction.guild.members.cache.get(optUser.id);

    if (sender.permissions.has('KICK_MEMBERS')) {
      if (!user.kickable) {
        return interaction.reply(`You cannot kick the user ${user.displayName}`);
      }

      user.kick(optReason);
      interaction.reply(`User ${user.displayName} has been kicked.`);
    } else {
      interaction.reply('You are not allowed to kick anyone.');
    }
  }
};

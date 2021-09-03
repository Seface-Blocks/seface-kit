import { CommandInteraction, GuildMember, User } from 'discord.js';
import { SlashCommand } from 'seface-kit';

export const command: SlashCommand = {
  name: 'kick',
  description: 'kick a specifc user',
  options: [
    { name: 'user', description: 'user to be kicked', type: 6, required: true },
    { name: 'reason', description: 'the reason', type: 3 },
  ],
  isSlashCommand: true,
  execute: async (client, interaction: CommandInteraction) => {
    const optUser: User = interaction.options.getUser('user');
    const optReason: string = interaction.options.getString('reason');

    const sender: GuildMember = interaction.guild.members.cache.get(interaction.user.id);
    const user: GuildMember = interaction.guild.members.cache.get(optUser.id);

    if (sender.permissions.has('KICK_MEMBERS')) {
      if (!user.kickable) {
        return interaction.reply(`You cannot kick user ${user.displayName}`);
      }

      user.kick(optReason);
      interaction.reply(`User ${user.displayName} has been kicked.`);
    } else {
      interaction.reply('You are not allowed to kick anyone.');
    }
  }
};

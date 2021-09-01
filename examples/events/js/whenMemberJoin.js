export const event = {
  name: 'guildMemberAdd',
  execute: async (client, instance, member) => {
    console.log(`${member.nickname} has joined the server!`);
  }
};

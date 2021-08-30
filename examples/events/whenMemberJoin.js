export const event = {
  name: 'guildMemberAdd',
  run: async (client, instance, member) => {
    console.log(`${member.nickname} has joined the server!`);
  }
};

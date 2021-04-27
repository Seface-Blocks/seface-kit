### Command example

```ts
// You can use .js file too, just remove the Command  type on the constant.
import { Command } from 'seface-kit';

export const command: Command = {
  name: 'ping',
  description: 'Returns pong!',
  aliases: ['p'],
  run: (client, message, args) => {
    message.channel.send('Pong!');
  }
};
```

### Event example

```ts
import { Event } from 'seface-kit';

export const event: Event = {
  name: 'guildMemberAdd',
  run: async (client, instance, member: GuildMember) {
    console.log(`${member.nickname} has joined the server!`)
  }
};
```

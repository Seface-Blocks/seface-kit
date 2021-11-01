# Creating your first prefix command

## Simple Prefix Command

A guide to creating a command for Discord wouldn't be a guide if it didn't have the ping command. See below how to create it using the Seface Kit!

{% code title="commands/ping.ts" %}
```typescript
import { PrefixCommand } from 'seface-kit';

export const command: PrefixCommand = {
  name: 'ping',
  description: 'Ping! Pong!',
  execute: async (client, message, args) => {
    message.channel.send('Pong!');
  }
};
```
{% endcode %}

{% hint style="warning" %}
Remember, you **must** name the constant as **command**, otherwise the `TypeError: Cannot read properties of undefined` error will be returned.
{% endhint %}

## Advanced Prefix Command

Now let's see how we can create a advanced command.

{% code title="commands/moderation/kick.ts" %}
```typescript
import { PrefixCommand } from 'seface-kit';

export const command: PrefixCommand = {
  name: 'kick',
  description: 'Kick members from the server.',
  execute: async (client, message, args) => {
    const sender = message.guild.members.cache.get(message.author.id);
    const userToKick = message.mentions.members.first();
    
    if(!userToKick) {
      message.channel.send('You need to mention a user to kick!');
      return;
    }
    
    if(!sender.permissions.has('KICK_MEMBERS')) {
      message.channel.send('You don\'t have permission to use this command!');
      return;
    }
    
    if(!userToKick.kickable) {
      message.channel.send('You can\'t kick this user!');
      return;
    }
    
    usertToKick.kick();
    message.reply('User kicked!');
  }
};
```
{% endcode %}

## Adding Aliases

To add aliases to Prefix Commands, just add the `aliases` property.

{% code title="commands/ping.ts" %}
```typescript
import { PrefixCommand } from 'seface-kit';

export const command: PrefixCommand = {
  name: 'ping',
  description: 'Ping! Pong!',
  aliases: ['p'],
  execute: async (client, message, args) => {
    message.channel.send('Pong!');
  }
};
```
{% endcode %}

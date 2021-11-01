# Creating your first slash command

**Before starting:**

> Global commands are available on all your app's guilds. Global commands are cached for 1 hour. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
>
> **Reference:** [https://bit.ly/3nGQrqF](https://bit.ly/3nGQrqF)

## Simple Slash Command

To create a slash command works a little differently, but following the same logic. Let's start with something basic.

{% code title="commands/ping.ts" %}
```typescript
import { SlashCommand } from 'seface-kit';

export const command: SlashCommand = {
  name: 'ping',
  descriptions: 'Ping! Pong!',
  options: [],
  guilds: 'YOUR_GUILD_ID',
  isSlashCommand: true,
  
  execute: async (client, interaction, sender, instance) => {
    interaction.reply('Pong!');
  }
};
```
{% endcode %}

{% hint style="warning" %}
Remember, you **must** name the constant as **command**, otherwise the `TypeError: Cannot read properties of undefined` error will be returned.
{% endhint %}

You can register slash commands **globally** or **per guilds**. See below for ways to register commands:

```typescript
guilds: 'GUILD_ID' // Register the command in the indicated guild.
guilds: ['GUILD_ID_1'] // Register the command in the indicated guild.
guilds: ['GUILD_ID_1', 'GUILD_ID_2'] // Register the command in the indicated guilds.
guilds: [] // Register the command globally.
```

## Advanced Slash Command

The way that the slash commands work with options/arguments is different and better for the user to see, as the options are presented as soon as they start typing in the chat. See below how to add options and use their user-submitted values.

{% code title="commands/moderation/kick.ts" %}
```typescript
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
    
    if(!sender.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('You don\'t have permission to use this command!');
    }
    
    if(!userToKick.kickable) {
      return interaction.reply('You can\'t kick this user!');
    }
    
    userToKick.kick(reason);
    interaction.reply('User kicked!');
  }
};
```
{% endcode %}

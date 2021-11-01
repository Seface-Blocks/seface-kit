---
description: A powerful discord.js Command and Event handler!
---

# Seface Kit

{% hint style="warning" %}
Seface Kit is **under development**, it is not recommended to use it for production environments
{% endhint %}

### Adding to your project

Once your project meets the [requirements](https://github.com/Seface-Blocks/seface-kit#requirements), run the command below in the project terminal to install the package.

```shell
yarn add seface-kit or npm install seface-kit
```

After instOnce installed, you need to add SefaceKit inside your bot's 'ready' event.

{% code title="index.ts" %}
```javascript
import * as Discord from 'discord.js';
import SefaceKit from 'seface-kit';

class MyBot {
  public client: Discord.Client;
  
  constructor() {
    this.client = new Discord.Client({
      intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
      ]
    });
    
    this.client.on('ready', () => {
      new SefaceKit(this.client, {
        commandsIn: 'commands', // The folder where the commands should be.
        eventsIn: 'events',     // The folder where the events should be.
        prefix: '!',            // The prefix for Prefix Commands.
        showWarns: false        // Does nothing on SNAPSHOT versions.
      });
    });
    
    this.client.login('BOT_TOKEN');
  }
}

export default new MyBot();
```
{% endcode %}

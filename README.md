## Seface Kit - ![Downloads](https://img.shields.io/npm/dm/seface-kit?label=Downloads&style=flat-square) ![Version](https://img.shields.io/npm/v/seface-kit?label=Version&style=flat-square)
### A powerful discord.js Command and Event handler!
English | [Portuguese](./.github/README.pt_BR.md)

---

**Seface Kit** is a Command and Event Handler for [discord.js v13](https://github.com/discordjs/discord.js/releases/tag/13.0.0). Let Seface Kit do the heavy lifting of recording your commands and events, keeping your project clean and organized!

> **Note:** Seface Kit allows organization by subfolders.

- [Instalations](#instalations)
  - [Requirements](#requirements)
  - [Installing](#installing)
- [Adding to your project](#adding-to-your-project)

## Instalations
### Requirements
  * [Node.js](https://nodejs.org/en/) 16.6.0 or newer;
  * [discord.js](https://discord.js.org/) 13.3.0 or newer;

### Installing
Once your project meets the requirements, run the command below in the project terminal to install the package.

**Using yarn**
```sh
yarn add seface-kit
```

**Using npm**
```sh
npm install seface-kit
```

## Adding to your project
**JavaScript and TypeScript support!** 🎉

```js
import { Client, Intents } from 'discord.js';
import SefaceKit from 'seface-kit';

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on('ready', () => {
  new SefaceKit(bot, {
    commandsIn: 'commands',
    eventsIn: 'events',
    showWarns: true,
    prefix: '!'
  })
})

bot.login('BOT_TOKEN');
```
[Here](./examples) you can found some examples of how to create commands and listen events.

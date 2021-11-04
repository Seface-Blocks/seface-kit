## Seface Kit - ![Downloads](https://img.shields.io/npm/dm/seface-kit?label=Downloads&style=flat-square) ![Version](https://img.shields.io/npm/v/seface-kit?label=Version&style=flat-square)
### Um poderoso _Command_ e _Event handler_ para discord.js!
[English](./../README.md) | Portuguese

---
<br/>

**Seface Kit** é um _Command_ e _Event Handler_ para o [discord.js v13](https://github.com/discordjs/discord.js/releases/tag/13.0.0). Deixe o Seface Kit fazer o trabalho sujo para você, permitindo que seu projeto continue limpo e organizado!

> **Nota:** Seface Kit permite a organização por subpastas.

- [Instalação](#instalação)
  - [Requerimentos](#requerimentos)
  - [Instalando](#instalando)
- [Adicionando ao seu projeto](#adicionando-ao-seu-projeto)

## Instalação
### Requerimentos
  * [Node.js](https://nodejs.org/en/) 16.6.0 ou superior;
  * [discord.js](https://discord.js.org/) 13.3.0 ou superior;

### Instalando
Depois que seu projeto atender aos requisitos, execute o comando abaixo no terminal do projeto para instalar o pacote.

```sh
yarn add seface-kit or npm install seface-kit
```

## Adicionando ao seu projeto
**JavaScript e TypeScript suportados!** 🎉

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
[Aqui](./examples) você pode encontrar alguns exemplos de como criar comandos e escutar eventos.

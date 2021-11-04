require('dotenv').config();
const Discord = require('discord.js');
const chalk = require('chalk');
const path = require('path');
const { SefaceKit } = require('seface-kit');

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});

client.on('ready', () => {
  console.clear();

  new SefaceKit(client, {
    commandsIn: path.join(__dirname, '/commands'),
    eventsIn: path.join(__dirname, '/events'),
    prefix: '!'
  });

  client.user.setActivity({
    type: 'PLAYING',
    name: 'with seface-kit module'
  });

  console.log(`${chalk.bold.green('✓')} The tester bot are online.`);
});

client.login(process.env.BOT_TOKEN);

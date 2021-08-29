import { Event, EventExecutor } from '../../interfaces/Event';

class CommandExecutor implements Event {
  public name = 'message'
  public run: EventExecutor;

  constructor() {
    this.run = async (client, instance, message) => {
      const { author, channel, content } = message;

      if (author.bot) { return; }
      if (channel.type === 'dm') { return; }
      if (!content.startsWith(instance.options.prefix)) { return; }

      const args = content.slice(instance.options.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      if (!command) { return; }

      const commandCollected = instance.registeredCommands.get(command) || instance.registeredCommandAliases.get(command);

      if (commandCollected) {
        commandCollected.run(client, message, args);
      }
    };
  }
}

export default new CommandExecutor();

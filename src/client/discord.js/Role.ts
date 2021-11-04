import Discord from 'discord.js';
import chalk from 'chalk';
import Messages from '@config/messages';

export class Role {

  public async getEveryone(guild: Discord.Guild): Promise<Discord.Role> {
    return new Promise((resolve) => {
      const role = guild.roles.everyone;

      resolve(role);
    });
  }

  public async getRoleByName(name: string, guild: Discord.Guild): Promise<Discord.Role> {
    return new Promise((resolve, reject) => {

      const role = guild.roles.cache.find((r) => r.name === name);

      if(!role) {
        reject(new Error(Messages.ROLE_NOT_FOUND.replace('{ROLE}', chalk.yellow(name))));
      }
      
      resolve(role);
    });
  }

  public async getRoleById(id: string, guild: Discord.Guild): Promise<Discord.Role> {
    return new Promise((resolve, reject) => {
      const role = guild.roles.cache.get(id);

      if (!role) {
        reject(new Error(Messages.ROLE_NOT_FOUND.replace('{ROLE}', chalk.yellow(id))));
      }

      resolve(role);
    });
  }
}

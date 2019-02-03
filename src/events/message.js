module.exports = async (client, message)  => {
  const Guild = require("./../core/models/guild.js");
  const responses = Object.keys(require("./../lib/responses.json"));
  const findObj = (id) => { return Guild.findById(id).exec() };
  const guild = await findObj(message.guild.id);
  const args = message.content.slice(guild.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var cooldown = {};
  
  if (message.author.bot) return;
  if (message.content.startsWith("<@" + client.user.id + ">")) message.channel.send("h-huh?");
  if (!(message.content.startsWith(guild.config.prefix) || responses)) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  
  if (!cooldown[message.author.id]) {
    cooldown[message.author.id] = true;
    if (guild.config.chatMode) {
      if (responses.includes(message.content.toLowerCase())) {
      require("./../core/responder.js").fn(client, message, responses);
      return;
      }
    }
      setTimeout(() => {
          cooldown[message.author.id] = false;
      }, 5000) // 5 seconds
    } 

    if (message.content.startsWith(guild.config.prefix)) {
    if (!(client.commands.get(command))) return;

      if (client.commands.get(command).meta.whitelisted) {
        if(client.whitelist.get(message.author.tag)) {
          client.commands.get(command).fn(client, message, args, guild);
          console.log(`Ran elevated command: ${command}, with argument(s): ${args}\n` +
          `By user:  ${message.author.tag} / ${message.author} \n` +
          `In guild: ${message.guild.name} / ${message.guild.id}\n`);
        }
      } else {
          client.commands.get(command).fn(client, message, args, guild);
          console.log(`Ran command: ${command}, with argument(s): ${args}\n` +
          `By user:  ${message.author.tag} / ${message.author} \n` +
          `In guild: ${message.guild.name} / ${message.guild.id}\n`);
        }
  }
}
  
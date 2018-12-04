module.exports = (client, message, Discord)  => {
  if (message.guild === null) return;
  const guildConf = client.settings.get(message.guild.id);
  const responses = Object.keys(require("./../lib/responses.json"));

  // RETURN?
  if(message.author.bot) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
      console.log(`Bot was denied send_message permission\n` +
     `By user:  ${message.author.tag} / ${message.author} \n` +
     `In guild: ${message.guild.name} / ${message.guild.id}`);
     return;
  }

  if (guildConf.chatMode) {
    if (responses.includes(message.content.toLowerCase())) {
        require("./../core/responder.js").fn(client, message, responses);
    }
  }

  if (!(message.content.startsWith(guildConf.prefix))) return;

  const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

    if (client.commands.get(command).meta.whitelisted) {
      if(client.whitelist.get(message.author.tag)) {
        client.commands.get(command).fn(client, message, args, Discord);
        console.log(`Ran elevated command: ${command}, with argument(s): ${args}\n` +
        `By user:  ${message.author.tag} / ${message.author} \n` +
        `In guild: ${message.guild.name} / ${message.guild.id}\n`);
      }
    } else {
        client.commands.get(command).fn(client, message, args, Discord);
        console.log(`Ran command: ${command}, with argument(s): ${args}\n` +
        `By user:  ${message.author.tag} / ${message.author} \n` +
        `In guild: ${message.guild.name} / ${message.guild.id}\n`);
      }
}

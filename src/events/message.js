module.exports = (client, message, Discord)  => {
  const guildConf = client.settings.get(message.guild.id);
  const responses = Object.keys(require("./../lib/responses.json"));

  // RETURN?
  if(message.author.bot) return;
  if (guildConf.chatMode) {
    if (responses.includes(message.content.toLowerCase())) {
        require("./../core/responder.js").fn(client, message, responses);
    }
  }
<<<<<<< HEAD
=======

>>>>>>> experimental
  if (!(message.content.startsWith(guildConf.prefix))) return;

  //MESSAGE IS A COMMAND, RUN COMMAND
  const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

<<<<<<< HEAD
  if(client.commands.get(command)) {
    client.commands.get(command).fn(client, message, args);
    console.log(`Ran command: ${command}, with argument(s): ${args}\nRequested by user: ${message.author}\nIn guild: ${message.guild.id}\n`);
=======

  if(client.commands.get(command)) {
    client.commands.get(command).fn(client, message, args, Discord);
    console.log(`\nRan command: ${command}, with argument(s): ${args}\nRequested by user: ${message.author.tag} / ${message.author} \nIn guild: ${message.guild.name} / ${message.guild.id}`);
>>>>>>> experimental
  }
}

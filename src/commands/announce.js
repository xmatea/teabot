exports.meta = {
  desc: "In desperate need of advice? Ask the magic eightball!",
  usage: "Usage: <command> <question>",
  module: "Fun"
}


exports.fn = function(client, message, args) {
  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
  }

    const Discord = require('discord.js');
    message.delete().catch(O_o=>{});
    message.channel.send(new Discord.RichEmbed()
    .setColor("#ffa7ad")
    .setDescription(args.join(" ")));
}

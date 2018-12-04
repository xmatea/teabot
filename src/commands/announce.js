exports.meta = {
  name: "announce",
  desc: "Prove your point by making it ~fancy~",
  usage: "Usage: <command> <question>",
  module: "Fun",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
  exports.speech = {
    maxlimit: "Woah there... I'm not allowed to embed a message that long! The limit is 2000 characters."
  }

  let myrole = message.guild.me.hasPermission("MANAGE_MESSAGES");
  if (myrole) {
    message.delete().catch(O_o=>{});
  }

  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
    return;
  }
    const Discord = require('discord.js');
    message.channel.startTyping(1);
    client.setTimeout(function(){
      message.channel.send(new Discord.RichEmbed()
      .setColor("#ffa7ad")
      .setDescription(args.join(" ")))
    }, 2500);
    message.channel.stopTyping(true);
}

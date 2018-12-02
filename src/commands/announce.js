exports.meta = {
  name: "announce",
  desc: "Prove your point by making it ~fancy~",
  usage: "Usage: <command> <question>",
  module: "Fun",
  enabled: true,
  whitelisted: false
}


exports.fn = function(client, message, args) {
  if (!(message.channel.me.hasPermissions('SEND_MESSAGES'))) return;
  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
    return;
  }
    const Discord = require('discord.js');
    if(message.channel.me.hasPermissions('MANAGE_MESSAGES')) {
      message.delete().catch(O_o=>{});
    }

    message.channel.startTyping(1);
    client.setTimeout(function(){message.channel.send(new Discord.RichEmbed()
      .setColor("#ffa7ad")
      .setDescription(args.join(" ")))
    }, 2500);

    message.channel.stopTyping(true);
}

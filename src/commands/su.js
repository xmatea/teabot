exports.meta = {
  name: "su",
  desc: "whitelisted commands",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn =  function (client, message, args) {
  const Discord = require('discord.js');
  
  if (args[0] === "guilds") {
        //GENERAL GUILD INFO
          let embed = new Discord.RichEmbed()
          .setTitle("General guild info:")
          .setDescription(`Guild count: ${client.guilds.size}\n`+
            `User count: ${client.users.size}\n`+
            `Channel count: ${client.channels.size}`);
            message.channel.send(embed);

      //LINK TO LOGS
    } else if (args[0] === "log") {
      message.channel.send("https://zeit.co/dashboard/deployments");

      //LINK TO DISCORD.ORG
    } else if (args[0] === "vote") {
      message.channel.send("https://discordbots.org/bot/474652348749316096/");
    }
}

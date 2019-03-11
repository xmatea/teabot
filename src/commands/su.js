exports.meta = {
  name: "su",
  desc: "whitelisted commands",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn = function (client, message, args) {
  const Discord = require('discord.js');
  const User = require('./../core/models/user.js')
  if (args[0] === "guilds") {
    //GENERAL GUILD INFO
    let embed = new Discord.RichEmbed()
      .setTitle("General guild info:")
      .setDescription(`Guild count: ${client.guilds.size}\n` +
        `User count: ${client.users.size}\n` +
        `Channel count: ${client.channels.size}`);
    message.channel.send(embed);

    //LINK TO LOGS
  } else if (args[0] === "log") {
    message.channel.send("https://zeit.co/dashboard/deployments");

    //LINK TO DISCORD.ORG
  } else if (args[0] === "vote") {
    message.channel.send("https://discordbots.org/bot/474652348749316096/");

  } else if (args[0] == "money") {
    if (args[1].length == 0) return;
    if ((args[2] === undefined) || (args[2].isNaN)) return;
    var userid = args[1].substring(2).slice(0, -1);
    if (userid.indexOf("!") == 0) {
      userid = userid.substring(1);
    }
    if (!(message.guild.members.get(userid))) {
      return message.channel.send("huh?");
    }
    User.updateOne(
      { _id: userid },
      {
        $inc: { "bank.bal": args[2] }
      }, function (err, doc) {
        if (err) { message.channel.send(errmsg); console.log(err); return }
        if (!doc) { message.channel.send(errmsg); console.log("no doc"); return }
        message.channel.send("Success");
      });

  } else if (args[0] == "getname") {
    if (args[1] == "-u") {
      var userid = args[2];
      if (!(message.guild.members.get(userid))) {
        return message.channel.send("huh?");
      } else { message.channel.send(client.users.get(userid).tag) }

    } else if(args[1] == "-g") {
      var guildid = args[2];
      if (!(client.guilds.get(guildid))) {
        return message.channel.send("huh?");
      } else { message.channel.send(client.guilds.get(guildid).name) }

    }

    }
}

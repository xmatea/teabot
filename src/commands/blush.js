exports.meta = {
  name: "blush",
  usage: "Usage: <command> <user>",
  desc: "When something makes you a litte uwu",
  module: "Gifs",
  enabled: true,
  whitelisted: false
}

exports.fn = function (client, message, args) {
  const Discord = require('discord.js');
  const blush = require("./../lib/gifs/blushlib.js");
  let username;
  let id;

  if (!(args === undefined || args.length == 0)) {
    id = args[0].substring(2).slice(0, -1);
    if (message.guild.members.get(id)) {
      username = message.guild.members.get(id).user.username;
    }
  }

  function getDesc() {
    if (args === undefined || args.length == 0) return speech.undefUser;
    if (id === message.author.id) return speech.userSelf;
    if (id === client.user.id) return speech.userMe;
    if (!(message.guild.members.get(id))) return speech.unknownUser;
    return speech.defUser;
  }

  let speech = {
    defUser: `${username} made ${message.author.username} blush!`,
    undefUser: `${message.author.username} is blushing...`,
    userSelf: `Congratulations, ${message.author.username}. You either fucked up or made yourself blush.`,
    unknownUser: `I don't think ${args[0]} is in this server, but, I can always make you blush.`,
    userMe: `Hehe, did I make you blush ${message.author.username}?`
  }

  message.channel.send(new Discord.RichEmbed()
    .setDescription(`**${getDesc()}**`)
    .setImage(blush.gifs[Math.floor(Math.random() * blush.gifs.length)])
    .setColor("#a3acff")
    .setFooter(message.author.username + " requested this btw")
    .setTimestamp()
  );
}

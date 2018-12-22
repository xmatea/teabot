exports.meta = {
  name: "cuddle",
  usage: "Usage: <command> <user>",
  desc: "Cuddle someone...",
  module: "Gifs",
  enabled: true,
  whitelisted: false
}

exports.fn = function (client, message, args) {
  const Discord = require('discord.js');
  const cuddle = require("./../lib/gifs/cuddlelib.js");
  let username;
  let id;

  if (!(args === undefined || args.length == 0)) {
    id = args[0].substring(2).slice(0, -1);
    if (message.guild.members.get(id)) username = message.guild.members.get(id).user.username;
  }

  let speech = {
    defUser: `${message.author.username} is cuddling with ${username} <3 `,
    undefUser: `${message.author.username} could really use some cuddles...`,
    userSelf: `Aww ${message.author.username}, you can't really cuddle yourself :(`,
    unknownUser: `I couldn't find ${args[0]} in the server, so here's a cuddle from me instead <3 `,
    userMe: `Oh! T-thanks, ${message.author.username} <3`
  }

  function getDesc() {
    if (args === undefined || args.length == 0) return speech.undefUser;
    if (id === message.author.id) return speech.userSelf;
    if (id === client.user.id) return speech.userMe;
    if (message.guild.members.get(id)) return speech.defUser;
    return speech.unknownUser;
  }

  message.channel.send(new Discord.RichEmbed()
    .setDescription(`**${getDesc()}**`)
    .setImage(cuddle.gifs[Math.floor(Math.random() * cuddle.gifs.length)])
    .setColor("#a3acff")
    .setFooter(message.author.username + " requested this btw")
    .setTimestamp()
  );
}
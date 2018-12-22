exports.meta = {
  name: "kiss",
  usage: "Usage: <command> <user>",
  desc: "Kiss someone extra special~",
  module: "Gifs",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
const Discord = require('discord.js');
const kiss = require("./../lib/gifs/kisslib.js");
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
  defUser: `Oh look, ${message.author.username} gave ${username} a kiss!`,
  undefUser: `${message.author.username}, are you lonely?`,
  userSelf: `${message.author.username}, why are you kissing yourself...?`,
  unknownUser: `I can't find ${args[0]} here, but it's okay, I'll kiss you instead :>`,
  userMe: `Aw, i love you too ${message.author.username} <3`
}

message.channel.send(new Discord.RichEmbed()
  .setDescription(`**${getDesc()}**`)
  .setImage(kiss.gifs[Math.floor(Math.random() * kiss.gifs.length)])
  .setColor("#a3acff")
  .setFooter(message.author.username + " requested this btw")
  .setTimestamp()
);

  }

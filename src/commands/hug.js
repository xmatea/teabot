exports.meta = {
  name: "hug",
  usage: "Usage: <command> <user>",
  desc: "Be wholesome, and give a hug to someone who needs it :>",
  module: "Gifs",
  enabled: true,
  whitelisted: false
}

exports.fn = function (client, message, args) {
  const Discord = require('discord.js');
  const hug = require("./../lib/gifs/huglib.js");
  let username;
  let id;

  if (!(args === undefined || args.length == 0)) {
    
      id = args[0].substring(2).slice(0, -1);
      if (id.indexOf("!") == 0) {
        id = id.substring(1);
      }
    
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
    defUser: `${message.author.username} just gave ${username} a hug! `,
    undefUser: `I think ${message.author.username} wants a hug...`,
    userSelf: `${message.author.username} gave themselves a hug. I guess that's possible?`,
    unknownUser: `I can't find ${args[0]} in the server, so I guess I'll give you the hug then! `,
    userMe: `Aw, thanks for thinking about me ${message.author.username}!`
  }

  message.channel.send(new Discord.RichEmbed()
    .setDescription(`**${getDesc()}**`)
    .setImage(hug.gifs[Math.floor(Math.random() * hug.gifs.length)])
    .setColor("#a3acff")
    .setFooter(message.author.username + " requested this btw")
    .setTimestamp()
  );
}

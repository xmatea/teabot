exports.meta = {
    name: "slap",
    usage: "Usage: <command> <user>",
    desc: "Slap a baka",
    module: "Gifs",
    enabled: true,
    whitelisted: false
  }
  
  exports.fn = function (client, message, args) {
    const Discord = require('discord.js');
    const slap = require("./../lib/gifs/slaplib.js");
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
      defUser: `${message.author.username} slapped ${username}!`,
      undefUser: `Slapping air, ${message.author.username}?`,
      userSelf: `${message.author.username} slapped themselves...`,
      unknownUser: `I can't find ${args[0]} in the server, but you can take you rage out on me :)`,
      userMe: `Owwww, what did i do wrong ${message.author.username}?`
    }
  
    message.channel.send(new Discord.RichEmbed()
      .setDescription(`**${getDesc()}**`)
      .setImage(slap.gifs[Math.floor(Math.random() * slap.gifs.length)])
      .setColor("#a3acff")
      .setFooter(message.author.username + " requested this btw")
      .setTimestamp()
    );
  }
  
exports.meta = {
    name: "pout",
    usage: "Usage: <command> <user>",
    desc: "Use this when you feel genuinely annoyed at something.",
    module: "Gifs",
    enabled: true,
    whitelisted: false
  }
  
  exports.fn = function (client, message, args) {
    const Discord = require('discord.js');
    const pout = require("./../lib/gifs/poutlib.js");
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
      defUser: `${message.author.username} is pouting at ${username}!`,
      undefUser: `${message.author.username} is pouting...`,
      userSelf: `${message.author.username} is pouting...`,
      unknownUser: `${message.author.username} is pouting...`,
      userMe: `What's wrong, ${message.author.username}?`
    }
  
    message.channel.send(new Discord.RichEmbed()
      .setDescription(`**${getDesc()}**`)
      .setImage(pout.gifs[Math.floor(Math.random() * pout.gifs.length)])
      .setColor("#a3acff")
      .setFooter(message.author.username + " requested this btw")
      .setTimestamp()
    );
  }
  
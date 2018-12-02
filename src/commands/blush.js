exports.meta = {
  name: "blush",
  usage: "Usage: <command> <user>",
  desc: "When something makes you a litte uwu",
  module: "Gifs",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args, Discord) {
  const guild = message.guild;
  let user = args[0];
  let prop;

  //IS ARGUMENT A USER?
  if (!(args === undefined || args.length == 0) && user.startsWith("<@")) {
    let id = user.substring(2).slice(0, -1);
      if (guild.members.get(id)) {
        prop = guild.members.get(id);
        user = prop.user.username;
      }
  }


  exports.speech = {
    defUser: `${user} made ${message.author.username} blush!`,
    undefUser: `${message.author.username} is blushing...`,
    userSelf: `Congratulations, ${message.author.username}. You either fucked up or made yourself blush.`,
    unknownUser: `${args[0]} made ${message.author.username} blush!`
  }

  let desc;
  if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;
   } else if(args[0].startsWith("<@")) {
       if(prop.user.tag === message.author.tag) {
         desc = this.speech.userSelf;
       } else {
          desc = this.speech.defUser;
        }
      } else {
         desc = this.speech.unknownUser;
      }

   const blush = require("./../lib/gifs/blushlib.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(blush.gifs[Math.floor(Math.random()* blush.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " requested this btw")
   .setTimestamp();

   message.channel.send(embed);
  }

exports.meta = {
  name: "cuddle",
  usage: "Usage: <command> <user>",
  desc: "Cuddle someone...",
  module: "Gifs",
  enabled: true
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
    defUser: `${message.author.username} is cuddling with ${user} <3 `,
    undefUser: `${message.author.username} could really use some cuddles...`,
    userSelf: `Aww ${message.author.username}, you can't really cuddle yourself :(`,
  }

  let desc;
  if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;

   } else if(prop.user.tag === message.author.tag) {
     desc = this.speech.userSelf;

   } else {
     desc = this.speech.defUser;
   }

   const cuddle = require("./../lib/gifs/cuddlelib.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(cuddle.gifs[Math.floor(Math.random()* cuddle.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " requested this btw")
   .setTimestamp();

   message.channel.send(embed);
  }

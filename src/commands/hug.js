exports.meta = {
  name: "hug",
  usage: "Usage: <command> <user>",
  desc: "Be wholesome, and give a hug to someone who needs it :>",
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
    defUser: `${message.author.username} just gave ${user} a hug! `,
    undefUser: `I think ${message.author.username} wants a hug...`,
    userSelf: `${message.author.username} gave themselves a hug. I guess that's possible?`,
  }

  let desc;
  if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;
   } else if(user.startsWith("<@")) {
       if(prop.user.tag === message.author.tag) {
         desc = this.speech.userSelf;
       } else {
         desc = this.speech.defUser;
       }
     } else {
      desc = this.speech.defUser;
    }

   const hug = require("./../lib/gifs/huglib.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(hug.gifs[Math.floor(Math.random()* hug.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " requested this btw")
   .setTimestamp();

   message.channel.send(embed);
  }

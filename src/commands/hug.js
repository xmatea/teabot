exports.meta = {
  name: "hug",
  usage: "Usage: <command> <user>",
  desc: "Be wholesome, and give a hug to someone who needs it!",
  module: "Fun"
}

exports.fn = function(client, message, args, Discord) {
  const user = args[0];

exports.speech = {
  defUser: `${message.author.username} just gave ${user} a hug! `,
  undefUser: `I think ${message.author.username} wants a hug...`,
//  userSelf: `${message.author.username} gave themselves a hug. I guess that's possible..?`,
}

  let desc;
   if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;
   } else {
     desc = this.speech.defUser;
   }

   const hug = require("./../lib/gifs/hug.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(hug.gifs[Math.floor(Math.random()* hug.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " did this btw")
   .setTimestamp();

   message.channel.send(embed);
  }

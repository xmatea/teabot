exports.meta = {
  name: "kiss",
  usage: "Usage: <command> <user>",
  desc: "Kiss someone extra special~",
  module: "Fun"
}

exports.fn = function(client, message, args, Discord) {
  const user = args[0];

exports.speech = {
  defUser: `Oh look, ${message.author.username} gave ${user} a kiss!`,
  undefUser: `${message.author.username}, are you lonely?`,
//  userSelf: `${message.author.username} gave themselves a hug. I guess that's possible..?`,
}

  let desc;
   if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;
   } else {
     desc = this.speech.defUser;
   }

   const kiss= require("./../lib/gifs/kiss.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(kiss.gifs[Math.floor(Math.random()* kiss.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " requested this btw")
   .setTimestamp();
   message.channel.send(embed);
  }

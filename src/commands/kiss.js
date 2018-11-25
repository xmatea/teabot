exports.meta = {
  name: "kiss",
  usage: "Usage: <command> <user>",
  desc: "Kiss someone extra special~",
  module: "Gifs",
  enabled: true
}

exports.fn = function(client, message, args, Discord) {
  const guild = message.guild;
  let user = args[0];
  let prop;

//IS ARGUMENT A USER????
  if (!(args === undefined || args.length == 0) && user.startsWith("<@")) {
    let id = user.substring(2).slice(0, -1);
      if (guild.members.get(id)) {
        prop = guild.members.get(id);
        user = prop.user.username;
      }
  }

exports.speech = {
  defUser: `Oh look, ${message.author.username} gave ${user} a kiss!`,
  undefUser: `${message.author.username}, are you lonely?`,
  userSelf: `${message.author.username}, why are you kissing yourself...?`,
}

  let desc;
  if(args === undefined || args.length == 0) {
     desc = this.speech.undefUser;

   } else if(prop.user.tag === message.author.tag) {
     desc = this.speech.userSelf;

   } else {
     desc = this.speech.defUser;
   }

   const kiss= require("./../lib/gifs/kisslib.js");

   let embed = new Discord.RichEmbed()
   .setDescription(`**${desc}**`)
   .setImage(kiss.gifs[Math.floor(Math.random()* kiss.gifs.length)])
   .setColor("#a3acff")
   .setFooter(message.author.username + " requested this btw")
   .setTimestamp();
   message.channel.send(embed);
  }

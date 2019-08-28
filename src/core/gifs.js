exports.fn = function (client, message, args, gifs, speech) {
        const Discord = require('discord.js');  
        let id = require('util.js').userId;
        console.log(id);

        function getDesc() {
          if (args === undefined) return speech.undefUser;
          if (id === message.author.id) return speech.userSelf;
          if (id === client.user.id) return speech.userMe;
          if (!(message.guild.members.get(id))) return speech.unknownUser;
          return speech.defUser;
        }
      
        message.channel.send(new Discord.RichEmbed()
          .setDescription(`**${getDesc()}**`)
          .setImage(gifs[Math.floor(Math.random() * gifs.length)])
          .setColor("#a3acff")
          .setFooter(message.author.username + " requested this btw")
          .setTimestamp()
        );
}

exports.meta = {
  name: "help",
<<<<<<< HEAD
  desc: "Sends a message showing all my commands!",
  usage: "<command>",
  module: "Core"
}
=======
  desc: "Displays this message!",
  usage: "<command>",
  module: "Core"
}

>>>>>>> experimental
exports.fn = function(client, message, args, Discord) {
  var guild = message.guild;
  const p = (client.settings.get(guild.id)).prefix;

<<<<<<< HEAD
  /*
  const fs = require('fs');
  let metadata = [];
  fs.readdir("./../commands", (err, files) => {
      files.forEach(f => {
        let props = require(`./src/commands/${f}`);
        metadata.push(props.meta.name, props.meta.desc);
      });
    }); */

    let announce = require('./announce.js');
    let chatmode = require('./chatmode.js');
    let clear = require('./clear.js');
    let eightball = require('./eightball.js');
    let say = require('./say.js');
    let setprefix = require('./setprefix.js');

    message.channel.send({embed: {
    color: 13797809,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Hi, I'm Tea! ",
    description: "Thank you for having me on this server, it means a lot <3 \nHere is a list of the things I can do! My prefix is `" + p + "`",
    fields: [{
        name: "Fun:",
        value: "`" + p + announce.meta.name + "` " + announce.meta.desc + "\n" +
         "`" + p + say.meta.name + "` " + say.meta.desc + "\n" +
        "`" + p + eightball.meta.name + "` " + eightball.meta.desc + "\n"
      },
      {
        name: "Core",
        value: "`" + p + chatmode.meta.name + "` " + chatmode.meta.desc + "\n" +
        "`" + p + setprefix.meta.name + "` " + setprefix.meta.desc + "\n" +
        "`" + p + this.meta.name + "` " + this.meta.desc + "\n"
      },
      {
        name: "Moderation",
        value: "`" + p + clear.meta.name + "` " + clear.meta.desc + "\n" +
        "\nThat's all I can do for now :> Gif features are coming soon... \nlove you all~"
      },
    ],
    timestamp: new Date(),
    footer: {
      desc: "Requested by " + message.author,
      icon_url: client.user.avatarURL,
      text: "You damn subcreatures. I wish I was one of you."
    }
  }
  });
=======
  const speech = {
    cmdinfo: ``,
    desc: `Thank you for having me on this server, it means a lot <3 \nMy prefix is ${p}`,
    footertext: `You damn subcreatures. I wish I was one of you.`,
  };

  client.commands.forEach(function(name, mod) {
    speech.cmdinfo = speech.cmdinfo + `\`${p}${name.meta.name}\` ${name.meta.desc}\n`;
  });

  let embed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setTitle("Hi, I'm Tea!")
    .setDescription(speech.desc)
    .addField("Here's a list of all the things i can do!", speech.cmdinfo)
    .setTimestamp(new Date())
    .setFooter(speech.footertext, client.user.avatarURL);
  message.channel.send(embed);
>>>>>>> experimental
}

exports.meta = {
    name: "commands",
    desc: "Displays a complete list of all commands.",
    usage: "<command>",
    module: "Core",
    enabled: false,
    whitelisted: false
  }
  
  exports.fn = function(client, message, args, guild) {
    const Discord = require('discord.js');
    let p = guild.config.prefix;
  
    const speech = {
      desc: `Here's a complete command list! My prefix: \`${p}\``,
      footertext: `You damn subcreatures. I wish I was one of you.`,
      fun: ``,
      core: ``,
      eco: ``,
      mod: ``,
      gifs: ``
    };
  
    client.commands.forEach(function(name, mod) {
      if(name.meta.whitelisted) return;
  
      switch(name.meta.module) {
        case "Fun":
        speech.fun = speech.fun + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
        break;
  
        case "Gifs":
        speech.gifs = speech.gifs + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
        break;
  
        case "Core":
        speech.core = speech.core + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
        break;
  
        case "Economy":
        speech.eco = speech.eco + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
        break;
  
        case "Moderation":
        speech.mod = speech.mod + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
        break;
      }
    });
  
    let embed = new Discord.RichEmbed()
      .setColor("#ffa5db")
      .setTitle("Hi, I'm Tea! :cherry_blossom:")
      .setDescription(speech.desc)
      .addField("Fun", speech.fun + speech.gifs)
      .addField("Core", speech.core)
      .addField("Economy", speech.eco)
     // .addField("Moderation", speech.mod)
      .setTimestamp(new Date())
      .setFooter(speech.footertext, client.user.avatarURL);
    message.channel.send(embed);
  }
  
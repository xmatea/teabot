exports.meta = {
  name: "help",
  desc: "Displays this message.",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args, Discord) {
  var guild = message.guild;
  const p = (client.settings.get(guild.id)).prefix;

  const speech = {
    desc: `Thank you for having me on this server, it means a lot! \nHere's a list of all the things i can do ! My prefix is \`${p}\``,
    footertext: `You damn subcreatures. I wish I was one of you.`,
    fun: ``,
    core: ``,
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

      case "Moderation":
      speech.mod = speech.mod + `\`${p}${name.meta.name}\` - ${name.meta.desc}\n`;
      break;
    }
  });

  let embed = new Discord.RichEmbed()
    .setColor("#ffa5db")
    //.setImage("https://i.imgur.com/LIrqMkX.jpg")
    .setTitle("Hi, I'm Tea!")
    .setDescription(speech.desc)
    .addField("Fun", speech.fun + speech.gifs)
    .addField("Core", speech.core)
    .addField("Moderation", speech.mod)
    .setTimestamp(new Date())
    .setFooter(speech.footertext, client.user.avatarURL);
  message.channel.send(embed);
}

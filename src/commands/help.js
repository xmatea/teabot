exports.meta = {
  name: "help",
  desc: "Displays this message!",
  usage: "<command>",
  module: "Core"
}

exports.fn = function(client, message, args, Discord) {
  var guild = message.guild;
  const p = (client.settings.get(guild.id)).prefix;

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
}

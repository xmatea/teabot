exports.meta = {
  name: "su",
  desc: "Posts general info for the bot.",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn =  function (client, message, args, Discord) {



  if (args === undefined || args.length == 0) {
    message.channel.send("```elevated commands list:\n"+
    "\nguilds (-ls)"+
    "\nlog"+
    "\nvote```");
  }

  if (args[0] === "log") {
    message.channel.send("https://zeit.co/dashboard/deployments");
  }

  if (args[0] === "vote") {
    message.channel.send("https://discordbots.org/bot/474652348749316096/");
  }

  if (args[0] === "guilds") {
    if (args[1] === "ls") {
      //LIST ALL GUILDS
      let guildlist = "";
      client.guilds.forEach(function(id, name) {
      guildlist = guildlist + id + " | ID: " + name + "\n";
    });

      let embed = new Discord.RichEmbed()
      .setTitle("Status: Guilds")
      .addField(`List of all guilds:`, guildlist)
      .addField("-", `Count: ${client.guilds.size}`);
      message.channel.send(embed);

    } else {
      //GENERAL GUILD INFO
        let embed = new Discord.RichEmbed()
        .setTitle("Status:")
        .setDescription(`Guild count: ${client.guilds.size}\n`+
        `User count: ${client.users.size}\n`+
        `Channel count: ${client.channels.size}`)
        message.channel.send(embed);

      }
  }
}

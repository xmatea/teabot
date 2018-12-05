exports.meta = {
  name: "su",
  desc: "Posts general info for the bot.",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn =  function (client, message, args, Discord) {

  if (args[0] === "status") {

    message.channel.send(new Discord.RichEmbed()
    .setTitle(":love_letter: Status:")
    .setColor("#fffce8")
    .setDescription(`Guild count: ${client.guilds.size}\n`+
    `User count: ${client.users.size}\n`+
    `Channel count: ${client.channels.size}`));

    var interval = setInterval (function () {
      message.channel.send(new Discord.RichEmbed()
        .setTitle(":love_letter: Status:")
        .setColor("#fffce8")
        .setDescription(`Guild count: ${client.guilds.size}\n`+
        `User count: ${client.users.size}\n`+
        `Channel count: ${client.channels.size}`));
      }  , 600 * 600 * 10 * 0.5); //sends every 0.5 hour


  } else if (args[0] === "log") {
    message.channel.send("https://zeit.co/dashboard/deployments");
  }
  else if (args[0] === "vote") {
    message.channel.send("https://discordbots.org/bot/474652348749316096/");
  }
  else if (args[0] === "guilds") {
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
        .setTitle("General guild info:")
        .setDescription(`Guild count: ${client.guilds.size}\n`+
        `User count: ${client.users.size}\n`+
        `Channel count: ${client.channels.size}`)
        message.channel.send(embed);
      }
  } else {
    message.channel.send("```elevated commands list:\n"+
    "\nguilds (-ls)"+
    "\nlog"+
    "\nvote```");
  }
}

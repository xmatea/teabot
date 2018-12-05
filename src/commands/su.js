exports.meta = {
  name: "su",
  desc: "Posts general info for the bot.",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn =  function (client, message, args, Discord) {

  if (args[0] === "init") {
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
      }  , 600 * 600 * 10 * 1); //sends every 1 hour

      //GUILD STATS
  } else if (args[0] === "guilds") {
        //GUILD LIST
        if (args[1] === "ls") {
        client.guilds.forEach(function(id, name) {
          message.channel.send(`${id} / ${name} / ${client.guilds.get(name).members.size} members\n`);
        });

        message.channel.send(`Done! Count: ${client.guilds.size}`);
      } else {
        //GENERAL GUILD INFO
          let embed = new Discord.RichEmbed()
          .setTitle("General guild info:")
          .setDescription(`Guild count: ${client.guilds.size}\n`+
            `User count: ${client.users.size}\n`+
            `Channel count: ${client.channels.size}`);
            message.channel.send(embed);
      }

      //LINK TO LOGS
    } else if (args[0] === "log") {
      message.channel.send("https://zeit.co/dashboard/deployments");

      //LINK TO DISCORD.ORG
    } else if (args[0] === "vote") {
      message.channel.send("https://discordbots.org/bot/474652348749316096/");

      //LIST ALL COMMANDS(NOT DONE)
    } else {
      message.channel.send("```elevated commands list:\n"+
      "\nguilds (-ls)"+
      "\nlog"+
      "\nvote```");
    }
}

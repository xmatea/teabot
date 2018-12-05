exports.meta = {
  name: "su",
  desc: "Posts general info for the bot.",
  usage: "<command>",
  module: "Core",
  enabled: true,
  whitelisted: true
}

exports.fn =  function (client, message, args, Discord) {

  switch(args[0]) {
    case "status" :
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
        }  , 600 * 600 * 10 * 1); //sends every 0.5 hour
        break;

    case "guilds":
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

      break;

      case "log":
        message.channel.send("https://zeit.co/dashboard/deployments");
          break;

      case "vote":
        message.channel.send("https://discordbots.org/bot/474652348749316096/");
          break;

    default:
      message.channel.send("```elevated commands list:\n"+
      "\nguilds (-ls)"+
      "\nlog"+
      "\nvote```");
  }
}

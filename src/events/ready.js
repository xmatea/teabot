module.exports = (client, defaultSettings) => {
  client.guilds.forEach(guild => {
    if(!client.settings.has(guild.id)) {
      client.settings.set(guild.id, defaultSettings);
    }

  setTimeout(function(){ // in leftToEight() milliseconds run this:
          sendMessage(); // send the message once
          var dayMillseconds = 1000 * 60 * 60 * 6;
          setInterval(function(){ // repeat this every 6 hours
              sendMessage();
          }, dayMillseconds)
      }, leftToEight())
  })

  function leftToEight(){
      var d = new Date();
      return (-d + d.setHours(8,0,0,0));
  }

  function sendMessage(){
    const Discord = require("discord.js");
      var guild = client.guilds.get('475067429568118786');
      if(guild && guild.channels.get('518771123413057547')) {
          guild.channels.get('518771123413057547').send(new Discord.RichEmbed()
          .setTitle("Status:")
          .setDescription(`Guild count: ${client.guilds.size}\n`+
          `User count: ${client.users.size}\n`+
          `Channel count: ${client.channels.size}`))
    }
  }
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("human | t.help");
}

require('http').createServer().listen(3000)
const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
client.settings = new Enmap({provider: new Provider({name: "settings"})});

// HANDLE THIS BETTER !!!!!
client.on('error', console.error);

const defaultSettings = {
  prefix: "t.",
  chatMode: true,
  chatLanguage: "english",
}

client.on("guildCreate", guild => {
  client.settings.set(guild.id, defaultSettings);
});

client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
});

client.on("ready", async() => {
    client.guilds.forEach(guild => {
      if(!client.settings.has(guild.id)) {
        client.settings.set(guild.id, defaultSettings);
      }
    });
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("Drinking tea! | t.help");
});


client.on("message", async(message) => {
  if (message.author.bot) return;
  const guildConf = client.settings.get(message.guild.id);

  if (guildConf.chatMode) {
    const responder = require('./src/core/responder.js');
    const content = require('./src/lib/responses.json');
    responder.fn(client, message, content);
  }

  if (!message.content.startsWith(guildConf.prefix)) return;


  const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const x = require("./src/commands/" + command + ".js");
  x.fn(client, message, args);

});
client.login(process.env.TOKEN);

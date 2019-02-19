//enjoy this mess :> made w love and anger
require('http').createServer().listen(3000)
require('dotenv').config();

const Discord = require("discord.js");
const mongoose = require('mongoose');
const fs = require('fs');
const config = require("./config.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.whitelist = new Discord.Collection();
client.whitelist.set("cursedtea#5140", 440497131342659594);

mongoose.connect(process.env.dbauth, { useNewUrlParser: true });

fs.readdir("./src/commands/", (err, files) => {
  files.forEach(f => {
    let props = require(`./src/commands/${f}`);
      if (props.meta.enabled) {
      client.commands.set(props.meta.name, props);
    }
  });
});

process.on('unhandledRejection', (reason) => { console.error(reason) });
client.on('error', console.error);
client.on('warn', console.warn);
client.on("guildMemberAdd", member => { require('./src/events/guildMemberAdd.js')(member)});
client.on("guildMemberRemove", member => { require('./src/events/guildMemberRemove.js')(member)});
client.on("guildCreate", guild => { require('./src/events/guildCreate.js')(client, guild, config.defaultSettings)});
client.on("guildDelete", guild => require('./src/events/guildDelete.js')(client, guild));
client.on("ready", async() => require('./src/events/ready.js')(client, config.defaultSettings));
client.on("message", async(message) => require("./src/events/message.js")(client, message));

client.login(process.env.TOKEN);
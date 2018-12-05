//INITIALIZE
require('http').createServer().listen(3000)
require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const fs = require('fs');

const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

client.settings = new Enmap({provider: new Provider({name: "settings"})});
client.commands = new Discord.Collection();
client.whitelist = new Discord.Collection();
client.whitelist.set('cursedtea#5140', '440497131342659594');

const defaultSettings = {
  prefix: "t.",
  chatMode: true,
}
const metadata = [];

fs.readdir("./src/commands/", (err, files) => {
  files.forEach(f => {
    let props = require(`./src/commands/${f}`);
      if (props.meta.enabled) {
      client.commands.set(props.meta.name, props);
    }
  });
});

//ERROR HANDLING
process.on('unhandledRejection', (reason) => {
  console.error(reason)
});

client.on('error', console.error);
client.on('warn', console.warn);


//EVENT HANDLING
client.on("guildCreate", guild => {
  client.settings.set(guild.id, defaultSettings);
  console.log(`I have joined a new guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);
});

client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
  console.log(`I have left a guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);
});

client.on("ready", async() => require('./src/events/ready.js')(client, defaultSettings));
let userCooldown = {};
client.on("message", async(message) => require("./src/events/message.js")(client, message, Discord, userCooldown));

//LOGIN
client.login(process.env.TOKEN);

//INITIALIZE
require('http').createServer().listen(3000)
require('dotenv').config();

const Discord = require("discord.js");
const mongoose = require('mongoose');
const fs = require('fs');
const config = require("./config.json");
const Guild = require("./src/core/models/guild.js");
const client = new Discord.Client();

mongoose.connect('mongodb+srv://matea:'+process.env.DBAUTH+'@cluster0-v6b6x.mongodb.net/teabot?retryWrites=true', { useNewUrlParser: true });

const defaultSettings = {
  prefix: "t.",
  chatMode: true,
};

client.commands = new Discord.Collection();
client.whitelist = new Discord.Collection();
client.whitelist.set('cursedtea#5140', '440497131342659594');

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

  const guildInst = new Guild({
      _id: guild.id,
      guildName: guild.name,
      guildSize: guild.members.size,
      config: {
        prefix: defaultSettings.prefix,
        chatMode: defaultSettings.chatMode
      }
    });

  guildObj.save()
  .then(result => console.log(result))
  .catch(err => console.log(err))
  console.log(`I have joined a new guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);

});

client.on("guildDelete", guild => {
  Guild.deleteOne({ _id: guild.id }, function (err) {
    if (err) console.log(err);
  });
  console.log(`I have left a new guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);
});

client.on("ready", async() => require('./src/events/ready.js')(client, defaultSettings));
client.on("message", async(message) => require("./src/events/message.js")(client, message));

//LOGIN
client.login(process.env.TOKEN);

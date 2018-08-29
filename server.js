require('http').createServer().listen(3000)
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const responseObject = require("./resources/responses.json");
const whitelistedWords = Object.keys(responseObject);

// Initialize **or load** the server configurations
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

client.settings = new Enmap({provider: new Provider({name: "settings"})});

client.on('error', console.error);

const defaultSettings = {
  prefix: ".",
  chatMode: true,
  /*welcomeMessage: "Hello user, welcome to the server!",
  welcomeChannel: "general"*/
}

client.on("guildCreate", guild => {
  // Adding a new row to the collection uses `set(key, value)`
  client.settings.set(guild.id, defaultSettings);
});

client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
});

/*client.on("guildMemberAdd", member => {
  let welcomeMesssage = welcomeMessage.replace("user", member.user.tag)
  member.guild.channels
  .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
  .send(welcomeMessage)
  .catch(console.error);
});*/

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
  const serverConf = client.settings.get(message.guild.id);
  //const guildConf = client.settings.get(message.guild.id);
  if((!whitelistedWords.includes(message.content)) && (!message.content.startsWith(serverConf.prefix))) return;
  if(message.author.bot) return;
  const guildConf = client.settings.get(message.guild.id) || defaultSettings;

  const args = message.content.slice(serverConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //checks if chatMode is enabled and fetches the values from responses.json


  if(responseObject[message.content] && (guildConf.chatMode == true)) {
    var int =  Math.floor(Math.random() * Math.floor(responseObject[message.content].length));
    var content = responseObject[message.content][int];
    message.channel.send(content);
 }

  switch(command) {
    case "help" :
    const embed = new Discord.RichEmbed()
    .setTitle("Hi, im Tea~")
    .setColor("#606691")
    .setDescription("Thanks for letting me stay here even though I'm new! In the future, I'll have way more functions!\n" +
  "Here's a list of all the things i can do! My prefix is `" + serverConf.prefix + "`")
    .addField("CORE:",
    "`chatmode [on] [off]` Enables or disables my ability to join the chat with you guys\n" +
    "`setprefix [prefix]` Set a new prefix for me\n" +
    "`help` Displays a list of all my commands\n", false)

    .addField("FUN:",
    "`say [text]` Makes me say anything owo\n" +
    "`embed [text]` Prove your point with embedded text\n" +
    "`8ball [text]` Ask the eightball a yes/no question\n" +
    "`kiss [user]` Give someone a little kiss :>\n", false)
    .addField("MODERATION:",
    "`clear` Clears chat history\n", false)
    .setFooter("bot by cursedbaby#5140")
    .setTimestamp()
    message.channel.send(embed);
    break;

    case "kiss" :
    var int =  Math.floor(Math.random() * Math.floor(20));
    const keys = require('./resources/gifs/kiss.json');
    var intString = int.toString();

    if (args === undefined || args.length == 0) {
    const embedded = new Discord.RichEmbed()
    .setDescription(message.author + " wants some kisses UmU")
    .setColor("#ffa7ad")
    .setImage(keys[intString]);
    message.channel.send(embedded);

} else if (args[0] === message.author) {
  const embedded = new Discord.RichEmbed()
  .setDescription("Are you lonely " + message.author+ "?")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);

} else {
  const embedded = new Discord.RichEmbed()
  .setDescription("Look!" + message.author + " just kissed " + args[0] + "!! How adorable :3")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);
}
    break;

    case "say" :
    if (args === undefined || args.length == 0) {
      message.channel.send("Usage: `t.say [yourTextHere]`");
    }
    else {
      const sayMessage = args.join(" ");
      // The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{});
      message.channel.send(sayMessage);
    }

    break;

    case "hug" :
    var int =  Math.floor(Math.random() * Math.floor(9));
    const keys = require('./resources/gifs/hug.json');
    var intString = int.toString();
    
    if (args === undefined || args.length == 0) {
    const embedded = new Discord.RichEmbed()
    .setDescription(message.author + " could really use a hug right now :(")
    .setColor("#ffa7ad")
    .setImage(keys[intString]);
    message.channel.send(embedded);

} else if (args[0] === message.author) {
  const embedded = new Discord.RichEmbed()
  .setDescription("Aw, " + message.author+ "had to hug themselves :<")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);

} else {
  const embedded = new Discord.RichEmbed()
  .setDescription("Oh! " + message.author + " gave " + args[0] + " a hug! They look so happy...")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);
}
    break;

    case "cuddle" :
    var int =  Math.floor(Math.random() * Math.floor(7));
    const keys = require('./resources/gifs/cuddle.json');
    var intString = int.toString();

    if (args === undefined || args.length == 0) {
    const embedded = new Discord.RichEmbed()
    .setDescription(message.author + " is lonely and wants some cuddles OmO")
    .setColor("#ffa7ad")
    .setImage(keys[intString]);
    message.channel.send(embedded);

} else if (args[0] === message.author) {
  const embedded = new Discord.RichEmbed()
  .setDescription("Of course you can cuddle with yourself, " + message.author+ "!")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);

} else {
  const embedded = new Discord.RichEmbed()
  .setDescription(message.author + " and " + args[0] + " cuddles! It looks so cozy...")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);
}
    break;

    case "kya" :
    var int =  Math.floor(Math.random() * Math.floor(2));
    const keys = require('./resources/gifs/kya.json');
    var intString = int.toString();

    if (args === undefined || args.length == 0) {
    const embedded = new Discord.RichEmbed()
    .setDescription(message.author + " is blushing! Now THAT is what i call kawaii :>")
    .setColor("#ffa7ad")
    .setImage(keys[intString]);
    message.channel.send(embedded);

} else if (args[0] === message.author) {
  const embedded = new Discord.RichEmbed()
  .setDescription("Hehe,  " + message.author+ " made themeselves blush. How tho?")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);

} else {
  const embedded = new Discord.RichEmbed()
  .setDescription("It seems like " + args[0] + " made "  + message.author + " blush a little OwO")
  .setColor("#ffa7ad")
  .setImage(keys[intString]);
  message.channel.send(embedded);
}
    break;
      
    case "test" :
    message.channel.send("k")
    break;

    case "embed" :
     if (args === undefined || args.length == 0) {
       message.channel.send("Usage: `t.embed [yourTextHere]`");
      }
       else {
        const text = args.join(" ");
        message.delete().catch(O_o=>{});
        const embedded = new Discord.RichEmbed().setColor("#ffa7ad").setDescription(text);
        message.channel.send(embedded);
      }
      break;

    case "8ball" :
     if (args === undefined || args.length == 0) {
         message.channel.send("You need to specify a yes or no question! ex: `t.8ball should i go to sleep?`");
       } else {
         var int =  Math.floor(Math.random() * Math.floor(12));
         const keys = require('./resources/eightball');
         var intString = int.toString();
         message.channel.send(keys[intString]);
       }
       break;

    case "setprefix" :
    if (args != null) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          message.channel.send("Oh, you have to be an administrator in order to use that command!")
        } else {

          guildConf.prefix = args[0];
          client.settings.set(message.guild.id, guildConf);
          message.channel.send("Changed my prefix to: `" + guildConf.prefix + "`");
        }
      } else {
        message.channel.send("Usage: `setprefix` `[new prefix]`");
    }
    break;

    case "clear" :
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages()
      .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("Error: Could not clear channel.")})
    }
    break;

    case "chatmode":
    if (args[0] == "on") {

      guildConf.chatMode = true;
      client.settings.set(message.guild.id, guildConf);
      if(guildConf.chatMode) {
      message.channel.send("Chat mode is now enabled! Thank god.. It's so lonely here");
    } else {
      message.channel.send("Aw, it looks like something went wrong! Im so sorry...");
    }
  } else if (args[0] == "off") {

      guildConf.chatMode = false;
      client.settings.set(message.guild.id, guildConf);
      if (!guildConf.chatMode) {
      message.channel.send("Chat mode is now disabled! Sorry for being so annoying...");
    } else {
      message.channel.send("Aw, it looks like something went wrong! Im so sorry...");
    }
    } else {
      message.channel.send("Usage: `chatmode` `on` / `off`");
    }
    break;
  }

});


client.login(process.env.TOKEN);

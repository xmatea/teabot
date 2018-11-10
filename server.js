require('http').createServer().listen(3000)
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
require('dotenv').config();


// Initialize **or load** the server configurations
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

client.settings = new Enmap({provider: new Provider({name: "settings"})});

client.on('error', console.error);

const defaultSettings = {
  prefix: "t.",
  chatMode: true,
  chatLanguage: "english",
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
  const guildConf = client.settings.get(message.guild.id);

  function getServerLang() {
    if (guildConf.chatLanguage == "norwegian") {
      return require("./resources/norwegian_responses.json");
    } else {
      return require("./resources/responses.json");
    }
}

  const responseObject = getServerLang();
  const whitelistedWords = Object.keys(responseObject);

  if((!whitelistedWords.includes(message.content.toLowerCase())) && (!message.content.startsWith(guildConf.prefix))) return;
  if(message.author.bot) return;

  const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  //checks if chatMode is enabled and fetches the values from responses.json
  if(responseObject[message.content.toLowerCase()] && (guildConf.chatMode == true)) {
    var int =  Math.floor(Math.random() * Math.floor(responseObject[message.content.toLowerCase()].length));
    var content = responseObject[message.content.toLowerCase()][int];
    message.channel.send(content);
 }
  switch(command) {
    case "help" :
    const embed = new Discord.RichEmbed()
    .setTitle("Hi, im Tea~")
    .setColor("#606691")
    .setDescription("Thanks for letting me stay here even though I'm new! In the future, I'll have way more functions!\n" +
  "Here's a list of all the things i can do! My prefix is `" + guildConf.prefix + "`")
    .addField("CORE:",+
    guildConf.prefix +"`chatmode [on] [off]` Enables or disables my ability to join the chat with you guys\n" +
    guildConf.prefix + "`setlanguage [english] [norwegian]` Yeah, i actually speak norwegian heh\n" +
    guildConf.prefix +  "`setprefix [prefix]` Set a new prefix for me\n" +
    guildConf.prefix +  "`help` Displays a list of all my commands\n", false)

    .addField("FUN:", +
   guildConf.prefix + "`say [text]` Makes me say anything owo\n" +
   guildConf.prefix + "`embed [text]` Prove your point with embedded text\n" +
   guildConf.prefix + "`8ball [text]` Ask the eightball a yes/no question\n" +
   guildConf.prefix + "`hug [user]` Hug someone who needs it!\n" +
  // guildConf.prefix + "`cuddle [user]` Nothing fixes a bad day better than cuddles :3\n" +
  // guildConf.prefix + "`kya [user]` We all blush at times...\n" +
   guildConf.prefix + "`kiss [user]` Kiss someone special~\n", false)
    .addField("MODERATION:", +
    guildConf.prefix + "`clear` Clears chat history\n", false)
    .setFooter("bot by cursedbaby#5140")
    .setTimestamp()
    message.channel.send(embed);
    break;

    case "say" :
    if (args === undefined || args.length == 0) {
      message.channel.send("Usage: `"+ guildConf.prefix + "say [text]`");
    }
    else {
      const sayMessage = args.join(" ");
      // The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{});
      message.channel.send(sayMessage);
    }

    break;

    case "kiss": case "hug": case "cuddle": case "kya":
      var gifmodule;
      var undefinedUser;
      var userSelf;
      var definedUser;

      switch (command) {
        case "kiss":
          gifmodule = require('./resources/gifs/kiss.json');
          undefinedUser = message.author + " wants some kisses UmU";
          userSelf = "Are you lonely " + message.author + "?";
          definedUser = "Look!" + message.author + " just kissed " + args[0] + "!! How adorable :3";

        break;

        case "hug":
          gifmodule = require('./resources/gifs/hug.json');
          undefinedUser = message.author + " could really use a hug right now :(";
          userSelf = "Aw, " + message.author+ "had to hug themselves :<";
          definedUser = "Oh! " + message.author + " gave " + args[0] + " a hug! They look so happy...";
      break;

        case "cuddle":
          gifmodule = require('./resources/gifs/cuddle.json');
          undefinedUser = message.author + " is lonely and wants some cuddles OmO";
          userSelf = "Of course you can cuddle with yourself, " + message.author+ "!";
          definedUser = message.author + " and " + args[0] + " cuddles! It looks so cozy...";
      break;

        case "kya":
          gifmodule = require('./resources/gifs/kya.json');
          undefinedUser = message.author + " is blushing! That's stupidly cute :>";
          userSelf = "Hehe,  " + message.author+ " made themeselves blush. How tho?";
          definedUser = "It seems like " + args[0] + " made "  + message.author + " blush a little OwO";
      break;
    }

    var int =  Math.floor(Math.random() * Math.floor((Object.keys(gifmodule).length + 1)));
    var intString = int.toString();

    if (args === undefined || args.length == 0) {
    const embedded = new Discord.RichEmbed()
    .setDescription(undefinedUser)
    .setColor("#ffa7ad")
    .setImage(gifmodule[intString]);
    message.channel.send(embedded);

  } else if (args[0] === message.author) {
    const embedded = new Discord.RichEmbed()
    .setDescription(userSelf)
    .setColor("#ffa7ad")
    .setImage(gifmodule[intString]);
    message.channel.send(embedded);

  } else {
    const embedded = new Discord.RichEmbed()
    .setDescription(definedUser)
    .setColor("#ffa7ad")
    .setImage(gifmodule[intString]);
    message.channel.send(embedded);
  }

    break;

    case "test" :
    console.log(guildConf.chatLanguage);
    break;

    case "embed" :
     if (args === undefined || args.length == 0) {
       message.channel.send("Usage: `" + guildConf.prefix + "embed [text]`");
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
    if (!(args === undefined || args.length == 0)) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          message.channel.send("Oh, you have to be an administrator in order to use that command!")
        } else {

          guildConf.prefix = args[0];
          client.settings.set(message.guild.id, guildConf);
          message.channel.send("Changed my prefix to: `" + guildConf.prefix + "`");
        }
      } else {
        message.channel.send("Usage: `" + guildConf.prefix + "setprefix` `[new prefix]`");
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

    case "setlanguage":
    if (args[0] == "english") {
        if (guildConf.chatLanguage === "english") {
          message.channel.send("It seems like my language has already been set to English!");
          return;
        }
      guildConf.chatLanguage = "english";
      client.settings.set(message.guild.id, guildConf);
      message.channel.send("Okay, i'll start talking english again. Ehem, testing, is this english?");

  } else if (args[0] == "norwegian") {
    const lang = getServerLang();
    if (guildConf.chatLanguage === "norwegian") {
      message.channel.send("Noen har allerede satt språket mitt til norsk!");
      return;
    }
      guildConf.chatLanguage = "norwegian";
      client.settings.set(message.guild.id, guildConf);
        message.channel.send("Åh, hei! Wow. Har savnet å snakke morsmålet mitt. K-Kan jeg virkelig snakke norsk her?");
    } else {
      message.channel.send("Usage: `setlanguage` `norwegian` / `english`");
    }
    break;
  }

});

client.login(process.env.TOKEN);

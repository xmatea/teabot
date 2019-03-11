exports.meta = {
  name: "chatmode",
  usage: "Usage: `<command>` `on` or `off`\nWhen enabled, I will reply to messages being sent in the chat, like 'hi' or 'gm'.",
  desc: "If my responses become annoying, I can disable them just for you <3",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args, guild) {
  
   const speech = {
    true: "Chat mode is now enabled! Thank you so much, now I have something to do!!",
    atrue: "It seems like chatmode has already been enabled.",
    false: "I see. Chat mode is now disabled. Sorry for being so annoying...",
    afalse: "It seems like chatmode has already been disabled.",
    denied: `I'm sorry ${message.author}, but you need to be an Administrator to perform that command...`,
    err: `Oh no, it looks like something went wrong. Contact **cursedtea#5140** if this is a problem.`
  }
  const Guild = require("./../core/models/guild.js");

  let role = message.member.hasPermission("ADMINISTRATOR");
  if (!role) {
    message.channel.send(speech.denied);
    console.log(`Tried running command: ${this.meta.name}, failed due to user perm denial vvvvv`);
    return;
  }

  if (args[0] == "on" ) {
    if (guild.config.chatMode) {
      message.channel.send(speech.atrue);
      return;
    } else {
      Guild.updateOne(
        { _id: message.guild.id },
        { $set: { 'config.chatMode': true } },
        (err) => {
            if (err) {
                message.channel.send(speech.err);
                return console.log(err);
            }
            message.channel.send(speech.true);
        });
      }
  } else if (args[0] == "off") {
    if (!guild.config.chatMode) {
        message.channel.send(speech.afalse);
    } else {
      Guild.updateOne(
        { _id: message.guild.id },
        { $set: { 'config.chatMode': false } },
        (err) => {
            if (err) {
                message.channel.send(speech.err);
                return console.log(err);
            }
            message.channel.send(speech.false);
        });
    }
  } else {
      message.channel.send(this.meta.usage);
  }
}

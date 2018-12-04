exports.meta = {
  name: "chatmode",
  usage: "Usage: `<command>` `on` or `off`\nWhen enabled, I will reply to messages being sent in the chat, like 'hi' or 'gm'.",
  desc: "If my responses become annoying, I can disable them just for you <3",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
  exports.speech = {
    true: "Chat mode is now enabled! Thank you so much, now I have something to do!!",
    atrue: "It seems like chatmode has already been enabled.",
    false: "I see. Chat mode is now disabled. Sorry for being so annoying...",
    afalse: "It seems like chatmode has already been disabled.",
    denied: `I'm sorry ${message.author}, but you need to be an Administrator to perform that command...`,
  }

  let role = message.member.hasPermission("ADMINISTRATOR");
  if (!role) {
    message.channel.send(this.speech.denied);
    console.log(`Tried running command: ${this.meta.name}, failed due to user perm denial vvvvv`);
    return;
  }

  const guildConf = client.settings.get(message.guild.id);
  const author = message.content.author;

  if (args[0] == "on") {
    if (guildConf.chatMode) {
      message.channel.send(this.speech.atrue);
      return;

    } else {
        guildConf.chatMode = true;
        client.settings.set(message.guild.id, guildConf);
        message.channel.send(this.speech.true);
      }
  } else if (args[0] == "off") {
    if (!guildConf.chatMode) {
        message.channel.send(this.speech.afalse);
    } else {
      guildConf.chatMode = false;
      message.channel.send(this.speech.false);
      client.settings.set(message.guild.id, guildConf);
    }
  } else {
      message.channel.send(this.meta.usage);
  }
}

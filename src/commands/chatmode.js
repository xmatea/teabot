exports.meta = {
  name: "chatmode",
  usage: "Usage: `<command>` `on` or `off`",
  desc: "If my responses become annoying, I can disable them just for you <3",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.speech = {
  true: "Chat mode is now enabled! Thank you so much, now I have something to do!!",
  atrue: "It seems like chatmode has already been enabled.",
  false: "I see. Chat mode is now disabled. Sorry for being so annoying...",
  afalse: "It seems like chatmode has already been disabled."
}

exports.fn = function(client, message, args) {
  const guildConf = client.settings.get(message.guild.id);
  const author = message.content.author;

  if (args.length == 0 || args === undefined) {
    message.channel.send(this.meta.usage);
    return;
  }

  if (args[0] == "on") {
    if (guildConf.chatMode) {
      message.channel.send(this.speech.atrue);
      return;

    } else {
        guildConf.chatMode = true;
        client.settings.set(message.guild.id, guildConf);
        message.channel.send(this.speech.true);
      }
  }

  if (args[0] == "off") {
    if (!guildConf.chatMode) {
        message.channel.send(this.speech.afalse);
    } else {
      guildConf.chatMode = false;
      message.channel.send(this.speech.false);
      client.settings.set(message.guild.id, guildConf);
    }
  }
}

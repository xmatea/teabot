exports.meta = {
  name: "setprefix",
  usage: "Usage: <command> <new prefix>",
  desc: "You can easily change my prefix with this command!",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
exports.speech = {
  changed: `Changed my prefix to `,
  maxlimit: `The new prefix cannot be longer than 10 characters.`,
  denied: `I'm sorry ${message.author}, but you need to be an Administrator to perform that command...`,
}

let role = message.member.hasPermission("ADMINISTRATOR");

  if (!role) {
    message.channel.send(this.speech.denied);
    console.log(`Tried running command: ${this.meta.name}, failed due to user perm denial vvvvv`);
    return;
  }

    if (args === undefined || args.length == 0) {
      message.channel.send(this.meta.usage);
      return;

    } else if (args[0].length > 10) {
      message.channel.send(this.speech.maxlimit);
      return;

    } else {
      guildConf = client.settings.get(message.guild.id);
      guildConf.prefix = args[0];
      client.settings.set(message.guild.id, guildConf);
      message.channel.send(this.speech.changed + guildConf.prefix);
    }
}

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
  noPerm: `This command can only be used by members with the "Manage Server" permission.`
}

guildConf = client.settings.get(message.guild.id);
if(message.member.hasPermission("manageServer")) {

    if (args === undefined || args.length == 0) {
      message.channel.send(this.meta.usage);
      return;

    } else {
      guildConf.prefix = args[0];
      client.settings.set(message.guild.id, guildConf);
      message.channel.send(this.speech.changed + guildConf.prefix);
    }

} else {
      message.channel.send(this.speech.noPerm);
    }
}

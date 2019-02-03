exports.meta = {
  name: "setprefix",
  usage: "Usage: <command> <new prefix>",
  desc: "You can easily change my prefix with this command!",
  module: "Core",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args, guild) {
const Guild = require("./../core/models/guild.js");
const config = require("./../../config.js")
let role = message.member.hasPermission("ADMINISTRATOR");

const speech = {
  changed: `Changed my prefix to `,
  maxlimit: `The new prefix cannot be longer than 10 characters.`,
  denied: `I'm sorry ${message.author}, but you need to be an Administrator to perform that command...`,
  err: `Oh no! It looks like something went wrong...\nIf you need any help, please contact **cursedtea#5140**`
}

  if (!role) {
    message.channel.send(speech.denied);
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
      Guild.updateOne(
        {_id: message.guild.id},
        { $set:
          {"config.prefix": args[0]}
    }, function (err, doc) {
      if(err) {
          message.channel.send(speech.err);
          console.log(err);
        }
        doc.save;
      });
      message.channel.send(speech.changed + args[0]);
  }
}

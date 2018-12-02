exports.meta = {
  name: "clear",
  usage: "Usage: <command>",
  desc: "Use this and I'll clear the chat in an instant.",
  module: "Moderation",
  enabled: true,
  whitelisted: false
}

exports.speech = {
  noPerm: `This command can only be used by members with the "Manage Messges" permission.`
}

exports.fn = function(client, message, args) {
  if (message.author.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages().then(function(list){
        message.channel.bulkDelete(list);
    }, function(err){
      message.channel.send("Error: Could not clear channel.")});

  } else {
    message.channel.send(this.speech.noPerm)
  }
}

exports.meta = {
  name: "clear",
  usage: "Usage: <command>",
  desc: "Use this and I'll clear the chat in an instant.",
  module: "Moderation",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
  exports.speech = {
    denied: `I'm sorry ${message.author}, but you need the Manage messages permission to perform that command...`,
    medenied: `Um... I'm sorry ${message.author}, but I need the manage messages permission to perform that command. Please contact an administrator if you think this is wrong.`
  }

  let myrole = message.guild.me.hasPermission("MANAGE_MESSAGES");
  let role = message.member.hasPermission("MANAGE_MESSAGES");

  if (!myrole) {
    message.channel.send(this.speech.medenied);
    console.log(`Tried running command: ${this.meta.name}, failed due to bot perm denial vvvvv`);
    return;
  }

  if (!role) {
    message.channel.send(this.speech.denied);
    console.log(`Tried running command: ${this.meta.name}, failed due to user perm denial vvvvv`);
    return;
  }

      message.channel.fetchMessages().then(function(list){
      message.channel.bulkDelete(list);
    }, function(err){
      message.channel.send("Error: Could not clear channel.")});
}

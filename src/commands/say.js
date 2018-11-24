exports.meta = {
  name: "say",
  usage: "Usage: <command> <text>",
  desc: "Make me say anything!",
  module: "Fun"
}

exports.fn = function(client, message, args) {
  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
    return;
  }

  message.delete().catch(O_o=>{});
<<<<<<< HEAD
  message.channel.send(args.join(" "));
=======

  message.channel.startTyping(1);
  client.setTimeout(function(){message.channel.send(args.join(" "))}, 2500);
  message.channel.stopTyping(true);
>>>>>>> experimental
}

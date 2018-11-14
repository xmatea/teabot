exports.meta = {
  usage: "Usage: <command> <text>",
  desc: "Make me say anything!",
  module: "Fun"
}
exports.fn = function(client, message, args) {
  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
  }
  message.delete().catch(O_o=>{});
  message.channel.send(args.join(" "));
}

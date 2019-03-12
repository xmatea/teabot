exports.meta = {
  name: "eightball",
  desc: "In desperate need of advice? Ask the magic eightball!",
  usage: "Usage: <command> <question>",
  module: "Fun",
  enabled: true,
  whitelisted: false
}

exports.fn = function(client, message, args) {
  let response = ["Yeah.", "Yes.", "No.", "Probably.", "Most likely ehehe...", "Probably not.", "Uh, no.", "Nope.", "Sure!", "Who knows?", "Depends?", "Maybe?"];
  
  if (args === undefined || args.length == 0) {
    message.channel.send(this.meta.usage);
  } else {
    message.channel.send(this.response[Math.floor(Math.random() * Math.floor(response.length))]);
  }
}

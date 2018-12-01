exports.meta = {
  name: "test",
  desc: "A simple test command for debugging.",
  module: "Core",
  enabled: false,
  whitelisted: false
};

exports.fn = function (client, message) {
    client.whitelist.set(message.author.tag, message.author.id);
    console.log(client.whitelist);
}

exports.meta = {
  name: "test",
  desc: "A simple test command for debugging.",
  module: "Core",
  enabled: true,
  whitelisted: true
};

exports.fn = function (client, message, args) {
  const items = require("./../lib/items/items.js");
  console.log(items.name);
  message.channel.send("You got a " + items.name);
}

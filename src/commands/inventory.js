exports.meta = {
    name: "inventory",
    desc: "Display your inventory",
    module: "Economy",
    enabled: true,
    whitelisted: false
  };
  
  exports.fn = function (client, message, args) {
    const User = require('./../core/models/user.js');
    let errmsg = "An error occurred! Contact **cursedtea#5140**";
    let nodoc = "Could not find document for " + message.author.id;
    let itemArray = [];

    User.findById(message.author.id, function(err, doc) {
        if (err) { console.log(err); message.channel.send(errmsg); return }
        if (!doc) { console.log(nodoc); message.channel.send(errmsg); return }
        if (doc.inventory.length == 0) return message.channel.send("you have nothing.");

        doc.inventory.forEach(item => {
            if (itemArray.includes(item)) {
                return;
            }

            itemArray.push(item);
            message.channel.send(item);
        });
    })

  }
  
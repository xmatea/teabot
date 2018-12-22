exports.meta = {
    name: "balance",
    desc: "Displays your current balance.",
    module: "Economy",
    enabled: true,
    whitelisted: false
  };
  
  exports.fn = function (client, message, args) {
    const User = require("./../core/models/user.js");
    const Discord = require("discord.js");
    let errmsg = "An error occurred! Contact **cursedtea#5140**";
    let nodoc = "Could not find document for " + message.author.id;

    User.findById(message.author.id, function(err, doc) {
        if (err) message.channel.send(errmsg); console.log(err);
        if (!doc) message.channel.send(errmsg); console.log(nodoc);
        message.channel.send(new Discord.RichEmbed()
        .setDescription(`**${message.author.username}**, your current balance is **${doc.bank.bal}:cherry_blossom:**`)
        .setColor("A96075"));
    });
  }
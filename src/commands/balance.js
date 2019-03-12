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
    const economy = require("../core/economy.js");
    const speech = require("../lib/speech.js");

    User.findById(message.author.id, function(err, doc) {
        if (err) { message.channel.send(speech.genErr); console.log(err); return }
        if (!doc) { economy.addUser(message.author.id); return message.channel.send(speech.tryAgain); }
        message.channel.send(new Discord.RichEmbed()
        .setDescription(`**${message.author.username}**, your current balance is **${doc.bank.bal}:cherry_blossom:**`)
        .setColor("A96075"));
    });
  }
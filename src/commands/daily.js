exports.meta = {
    name: "daily",
    desc: "Each day, you can claim 100 :cherry_blossom: sakuras!",
    module: "Economy",
    enabled: true,
    whitelisted: false
};

exports.fn = function (client, message, args, guild) {
    const time = new Date();
    const User = require('../core/models/user.js');
    const Discord = require('discord.js');
    let errmsg = "An error occurred! Contact **cursedtea#5140**";

    User.findById(message.author.id, function (err, doc) {
        if (err) { message.channel.send(errmsg); console.log(err); return }
        if (!doc) { message.channel.send(errmsg); console.log("no doc"); return }

        var diff = time - doc.bank.lastClaimed;
        if ((diff > 1000*60*60*24) || doc.bank.lastClaimed === null) {
            User.updateOne(
            { _id: message.author.id },
            { $set: { "bank.bal": + doc.bank.bal + 100, "bank.lastClaimed": time}
            }, function (err, doc) {
                if (err) { message.channel.send(errmsg); console.log(err); return }
                if(!doc) { message.channel.send(errmsg); console.log("no doc"); return }
                message.channel.send(new Discord.RichEmbed()
            .setTitle(`Daily sakuras`)
            .setDescription(`**${message.author.username}** just recieved **100** :cherry_blossom:\nYou can claim your next sakuras in 24 hours.`)
            .setColor("A96075"));
            });

        } else {
            let timeLeft = (1000*60*60*24 - (diff));
            timeLeft = timeLeft / 1000;
            let s = Math.floor(timeLeft % 60);
            timeLeft = timeLeft / 60;
            let m = Math.floor(timeLeft % 60);
            timeLeft = timeLeft / 60;
            let h = Math.floor(timeLeft % 24);
            
            message.channel.send(new Discord.RichEmbed()
            .setTitle(`Daily sakuras`)
            .setDescription(`Aw, you have already claimed your daily sakuras!\nTry again in **${h} hrs**, **${m} mins**, and **${s} secs** <3`)
          //  .setThumbnail("https://i.imgur.com/zF4pDd3.jpg")
            .setColor("A96075"));
        }
    });
}

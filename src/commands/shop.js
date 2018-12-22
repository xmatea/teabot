exports.meta = {
    name: "shop",
    desc: "You can buy mystery crates at the store!",
    module: "Economy",
    enabled: true,
    whitelisted: false
};

exports.fn = function (client, message, args, guild) {
    const Discord = require('discord.js');
    const User = require('./../core/models/user.js');
    const items = require("./../lib/items/items.js");

    let p = guild.config.prefix;
    let errmsg = "An error occurred! Contact **cursedtea#5140**";
    let nodoc = "Could not inc document for " + message.author.id;

    if (args === undefined || args.length == 0) {
        message.channel.send(new Discord.RichEmbed()
            .setTitle("Shop")
            .setDescription(`Welcome to the store **${message.author.username}**!\nTo buy an item, type \`${p}shop buy <item>\`\nFor more info, type \`${p}shop help\``)
            .addField("Crates", "small crate: **75** :cherry_blossom:\nmedium crate: **90** :cherry_blossom:\nlarge crate: **100** :cherry_blossom:"));
    }

    if (args[0] === "buy") {
        if (args[2] === "crate") {
            if (args[1] === "small") {
                User.findById(message.author.id, function (err, doc) {
                    if (err) { message.channel.send(errmsg); console.log(err); return }
                    if (!doc) { message.channel.send(errmsg); console.log(nodoc); return }
                    if (doc.bank.bal < 75) { message.channel.send("You need more money!"); return }
                    let item1 = getObj();
                    let item2 = getObj();

                    User.updateOne(
                        { _id: message.author.id },
                        {
                            $set:
                                { "bank.bal": doc.bank.bal - 75 },
                            $push: { inventory: { $each: [item1.name, item2.name] } }
                        }, function (err, doc) {
                            if (err) {
                                message.channel.send(errmsg);
                                console.log(err);
                            }
                            doc.save;
                        });

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [1/2]")
                        .setDescription("1x **" + item1.value + "** " + item1.name)
                        .setThumbnail(item1.img64));

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [2/2]")
                        .setDescription("1x **" + item2.value + "** " + item2.name)
                        .setThumbnail(item2.img64));
                });
            }
            if (args[1] === "medium") {
                User.findById(message.author.id, function (err, doc) {
                    if (err) { message.channel.send(errmsg); console.log(err); return }
                    if (!doc) { message.channel.send(errmsg); console.log(nodoc); return }
                    if (doc.bank.bal < 90) { message.channel.send("You need more money!"); return }
                    let item1 = getObj();
                    let item2 = getObj();
                    let item3 = getObj();

                    User.updateOne(
                        { _id: message.author.id },
                        {
                            $set:
                                { "bank.bal": doc.bank.bal - 90 },
                            $push: { inventory: { $each: [item1.name, item2.name, item3.name] } }
                        }, function (err, doc) {
                            if (err) {
                                message.channel.send(errmsg);
                                console.log(err);
                            }
                            doc.save;
                        });

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [1/3]")
                        .setDescription("1x **" + item1.value + "** " + item1.name)
                        .setThumbnail(item1.img64));

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [2/3]")
                        .setDescription("1x **" + item2.value + "** " + item2.name)
                        .setThumbnail(item2.img64));
                    
                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [3/3]")
                        .setDescription("1x **" + item3.value + "** " + item3.name)
                        .setThumbnail(item3.img64));
                });
            }
            if (args[1] === "large") {
                User.findById(message.author.id, function (err, doc) {
                    if (err) { message.channel.send(errmsg); console.log(err); return }
                    if (!doc) { message.channel.send(errmsg); console.log(nodoc); return }
                    if (doc.bank.bal < 100) { message.channel.send("You need more money!"); return }
                    let item1 = getObj();
                    let item2 = getObj();
                    let item3 = getObj();
                    let item4 = getObj();

                    User.updateOne(
                        { _id: message.author.id },
                        {
                            $set:
                                { "bank.bal": doc.bank.bal - 100 },
                            $push: { inventory: { $each: [item1.name, item2.name, item3.name, item4.name] } }
                        }, function (err, doc) {
                            if (err) {
                                message.channel.send(errmsg);
                                console.log(err);
                            }
                            doc.save;
                        });

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [1/4]")
                        .setDescription("1x **" + item1.value + "** " + item1.name)
                        .setThumbnail(item1.img64));

                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [2/4]")
                        .setDescription("1x **" + item2.value + "** " + item2.name)
                        .setThumbnail(item2.img64));
                    
                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [3/4]")
                        .setDescription("1x **" + item3.value + "** " + item3.name)
                        .setThumbnail(item3.img64));
                    
                    message.channel.send(new Discord.RichEmbed()
                        .setTitle("You recieved an item! [4/4]")
                        .setDescription("1x **" + item4.value + "** " + item4.name)
                        .setThumbnail(item4.img64));
                });
            }
        }

        function getObj() {
            let obj;
            function weightedRand(spec) {
                var i, sum = 0, r = Math.random();

                for (i in spec) {
                    sum += spec[i];
                    if (r <= sum) return i;
                }
            }

            let j = weightedRand({ 0: 0.6, 1: 0.3, 2: 0.07, 3: 0.03 });
            if (j == 0) {
                obj = items.common;
                return items.common[Math.floor(Math.random() * obj.length)];
            } else if (j == 1) {
                obj = items.uncommon;
                return items.uncommon[Math.floor(Math.random() * obj.length)];
            } else if (j == 2) {
                obj = items.rare;
                return items.rare[Math.floor(Math.random() * obj.length)];
            } else if (j == 3) {
                obj = items.veryrare;
                return items.veryrare[Math.floor(Math.random() * obj.length)];
            }
        }
    }
}
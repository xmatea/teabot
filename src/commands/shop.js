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
    const itemObj = require("./../lib/items/items.js");
    const speech = require("./../lib/speech.js");

    const crates = require("./../core/crates.js");
    const economy = require("./../core/economy.js");
    const p = guild.config.prefix;

    if (args === undefined || args.length == 0) {
        const embed = {
            "title": `Welcome to the shop, ${message.author.username}!`,
            "description": speech.shopdesc,
            "color": 11100277,
            "fields": [
              {
                "name": "Small crate",
                "value": `Price: **${crates.smallCrate.price}** :cherry_blossom: \nThis crate contains __two__ items.`,
                "inline": true
              },
              {
                "name": "Medium crate",
                "value": `Price: **${crates.mediumCrate.price}** :cherry_blossom: \nThis crate contains __three__ items.`,
                "inline": true
              },
              {
                "name": "Large crate",
                "value": `Price: **${crates.largeCrate.price}** :cherry_blossom: \nThis crate contains __four__ items.`,
                "inline": true
              }
            ]
          };
          message.channel.send({ embed });
    }

    if (args[0].toLowerCase() === "buy") {
        if (args[2] !== undefined && (args[2].toLowerCase() === "crate")) {
            var crate;
            var items = [];
            var itemsToAdd = [];
            if (args[1].toLowerCase() === "small") { crate = crates.smallCrate; }
            else if (args[1].toLowerCase() === "medium") { crate = crates.mediumCrate; }
            else if (args[1].toLowerCase() === "large") { crate = crates.largeCrate; }
            else {return message.channel.send(speech.economy.itemNotFound)}
            
            for (let i = 0; i < crate.size; i++) {
                let obj = getObj();
                items.push(obj);
                itemsToAdd.push(obj);
            }

            var itemsadded = [];
            User.findById(message.author.id, function (err, doc) {
                if(err) {message.channel.send(speech.genErr); return console.log(err)};
                if(!doc) { economy.addUser(message.author.id); return message.channel.send(speech.tryAgain)}

                if (doc.bank.bal < crate.price) {
                    return message.channel.send(speech.economy.nomoney);
                } else {
                    User.updateOne(
                            { _id: message.author.id },
                            { $inc: { 'bank.bal': (crate.price * -1) } },
                            (err) => {
                                if (err) {
                                    message.channel.send(speech.genErr);
                                    return console.log(err);
                                }
                            });

                    for (let j = 0; j < items.length; j++) {
                        User.findOne({ _id: message.author.id, 'inventory.name': items[j].name }, function (err, doc) {
                            if (doc || (itemsadded.includes(items[j].name))) {
                                User.updateOne(
                                    { _id: message.author.id, 'inventory.name': items[j].name },
                                    { $inc: { 'inventory.$.qty': 1 } },
                                    (err) => {
                                        if (err) {
                                            message.channel.send(speech.genErr);
                                            return console.log(err);
                                        }
                                    });
                            } else {
                                itemsadded.push(items[j].name);
                                User.updateOne(
                                    { _id: message.author.id },
                                    { $push: { 'inventory': items[j] } },
                                    (err) => {
                                        if (err) {
                                            message.channel.send(speech.genErr);
                                            return console.log(err);
                                        }
                                    });
                            }

                        });

                    }

                    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                        message.channel.send(new Discord.RichEmbed()
                            .setDescription(`**${message.author.username}** just bought a **${crate.name}**!`)
                            .setColor("A96075"))
                            .then((message) => {
                                setTimeout(function () {
                                    message.edit(new Discord.RichEmbed()
                                        .setDescription(`Opening the crate...`)
                                        .setColor("A96075"))
                                }, 1500);
                                message.delete(5000);
                            });

                        setTimeout(() => {
                            for (let i = 0; i < items.length; i++) {
                                message.channel.send(new Discord.RichEmbed()
                                    .setTitle(`${message.author.username} recieved an item! [${i + 1}/${crate.size}]`)
                                    .setDescription(`1x **${items[i].value}** ${items[i].name}`)
                                    .setColor("A96075")
                                    .setThumbnail(items[i].img64));
                            }
                        }, 5000)
                    } else {
                        for (let i = 0; i < items.length; i++) {
                            message.channel.send(new Discord.RichEmbed()
                                .setTitle(`${message.author.username} recieved an item! [${i + 1}/${crate.size}]`)
                                .setDescription(`1x **${items[i].value}** ${items[i].name}`)
                                .setColor("A96075")
                                .setThumbnail(items[i].img64));
                        }
                    }
                }

            });
        }

                function getObj() {
                    function weightedRand(spec) {
                        var i, sum = 0, r = Math.random();
                        for (i in spec) {
                            sum += spec[i];
                            if (r <= sum) return i;
                        }
                    }

                    let obj;
                    let j = weightedRand({ 0: 0.4, 1: 0.35, 2: 0.15, 3: 0.1 });
                    if (j == 0) {
                        obj = itemObj.filter(item => item['value'] === "Common");
                        return obj[Math.floor(Math.random() * obj.length)];
                    } else if (j == 1) {
                        obj = itemObj.filter(item => item['value'] === "Uncommon");
                        return obj[Math.floor(Math.random() * obj.length)];
                    } else if (j == 2) {
                        obj = itemObj.filter(item => item['value'] === "Rare");
                        return obj[Math.floor(Math.random() * obj.length)];
                    } else if (j == 3) {
                        obj = itemObj.filter(item => item['value'] === "Very rare");
                        return obj[Math.floor(Math.random() * obj.length)];
                    }
                }
            }
            
}

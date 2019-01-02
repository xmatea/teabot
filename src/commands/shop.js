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
    const crates = require("./../core/crates.js")
    let errmsg = "An error occurred! Contact **cursedtea#5140**";
    let nodoc = "Could not find document for " + message.author.id;
    let p = guild.config.prefix;

    if (args === undefined || args.length == 0) {
        message.channel.send(new Discord.RichEmbed()
            .setTitle("Shop")
            .setColor("A96075")
            .setDescription(`Welcome to the store **${message.author.username}**!\nTo buy an item, type \`${p}shop buy <item>\`\nFor more info, type \`${p}shop help\``)
            .addField("Crates", `small crate: **${crates.smallCrate.price}** :cherry_blossom:\nmedium crate: **${crates.mediumCrate.price}** :cherry_blossom:\nlarge crate: **${crates.largeCrate.price}** :cherry_blossom:`));
    }

    if (args[0] === "buy") {
        if (args[2] === "crate") {
            var crate;
            var items = [];
            var itemsToAdd = [];

            if (args[1] === "small") { crate = crates.smallCrate; }
            if (args[1] === "medium") { crate = crates.mediumCrate; }
            if (args[1] === "large") { crate = crates.largeCrate; }

            for (let i = 0; i < crate.size; i++) {
                let obj = getObj();
                items.push(obj);
                itemsToAdd.push(obj);
            }

            // the code should check if there is any item in the items variable that matches any value in inventory array.
            // the two updateOne()s work seperately, but only one of them should run, depending on whether the document exists or not.
            // i cant find a way to do this without explicitly iterating through the document as well as the items array
            // sorry if my explanation is bad

            for (let j = 0; j < items.length; j++) {
                var doc = User.findOne({ _id: message.author.id }).exec();
                doc.then(function (result) {
                    var item = items[j];
                    console.log(item);
                    console.log(result.inventory);
                    console.log(containsObject(item, result.inventory));
                    //IF THE INVENTORY IS EMPTY, DO THIS
                    if ((result.inventory.length = 0)) {
                        console.log("inventory was empty. adding " + items[j].name);
                        User.updateOne(
                            { _id: message.author.id, },
                            { $inc: { "bank.bal": (crate.price * -1) }, 
                            $push: { inventory: items[j] } }, (err, doc) =>{ 
                                if (err) { 
                                    message.channel.send(errmsg); 
                                    return console.log(err) 
                                }
                        });
                    //IF THE INVENTORY IS NOT EMPTY, DO THIS
                    } else {
                        // BUT THE STATEMENT BELOW IS NEVER TRUE
                        if (containsObject(item, result.inventory)) {
                        console.log("inventory was not empty. already exists " + items[j].name );
                        User.updateOne(
                            { _id: message.author.id, 'inventory.name': items[j].name },
                            { $inc: { 'inventory.$.qty': 1 } }, (err, doc) => {
                                if (err) { 
                                    message.channel.send(errmsg);
                                    return console.log(err); 
                                } 
                        });

                        //THIS CODE RUNS HOWEVER
                        } else if (!containsObject(items[j], result.inventory)) {
                            console.log("inventory was not empty. did not exist " + items[j].name );
                            User.updateOne(
                                { _id: message.author.id, },
                                { $inc: { "bank.bal": (crate.price * -1) }, 
                                $push: { inventory: items[j] } }, (err, doc) =>{ 
                                    if (err) { 
                                        message.channel.send(errmsg); 
                                        return console.log(err) 
                                    }
                            });
                        }
                    }
                });
            }
                

            function containsObject(obj, list) {
                var x;
                for (x in list) {
                    if (list.hasOwnProperty(x) && list[x] === obj) {
                        return true;
                    }
                }
            
                return false;
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
                            .setTitle(`You recieved an item! [${i + 1}/${crate.size}]`)
                            .setDescription(`1x **${items[i].value}** ${items[i].name}`)
                            .setColor("A96075")
                            .setThumbnail(items[i].img64));
                    }
                }, 5000)
            } else {
                for (let i = 0; i < items.length; i++) {
                    message.channel.send(new Discord.RichEmbed()
                        .setTitle(`You recieved an item! [${i + 1}/${crate.size}]`)
                        .setDescription(`1x **${items[i].value}** ${items[i].name}`)
                        .setColor("A96075")
                        .setThumbnail(items[i].img64));
                }
            }
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
            let j = weightedRand({ 0: 0.6, 1: 0.3, 2: 0.07, 3: 0.03 });

            if (j == 0) {
                obj = itemObj.common;
                return itemObj.common[Math.floor(Math.random() * obj.length)];
            } else if (j == 1) {
                obj = itemObj.uncommon;
                return itemObj.uncommon[Math.floor(Math.random() * obj.length)];
            } else if (j == 2) {
                obj = itemObj.rare;
                return itemObj.rare[Math.floor(Math.random() * obj.length)];
            } else if (j == 3) {
                obj = itemObj.veryrare;
                return itemObj.veryrare[Math.floor(Math.random() * obj.length)];
            }
        }
    }
}

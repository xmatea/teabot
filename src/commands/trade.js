exports.meta = {
    name: "trade",
    usage: "Usage: `<item>` <user>",
    desc: "Trade your items with other users",
    module: "Economy",
    enabled: false,
    whitelisted: false
}

exports.fn = async function (client, message, args, guild) {
    const Discord = require('discord.js');
    const User = require('./../core/models/user.js');
    const items = require("./../lib/items/items.js");
    const p = guild.config.prefix;
    const speech = {
        errmsg: "An error occurred! Contact **cursedtea#5140**",
        nodoc: "Could not find document for " + message.author.id
    }

    if (args === undefined) {
        //help
        return;
    } else if (args.length < 2) {
        message.channel.send(this.meta.usage);
        return;
    }

    var itemargs = args.pop();
    var userargs = args[args.length - 1];
    let userid = userargs.substring(2).slice(0, -1);
    let userObj;

    console.log(userid);

    if (message.guild.members.get(userid)) {
        userObj = message.guild.members.get(userid).user;
    }

    items.forEach(item => {
        if (item.name.toLowerCase === itemargs.name.toLowerCase) {
            itemObj = item;
        }
    });

    if (itemObj === undefined) {
        //FORMAT THIS
        message.channel.send("please enter a valid item!");
        return;
    } else if (userObj === undefined) {
        message.channel.send("Please enter a valid user!")
    }

    User.find(message.author.id)
    const findObj = (id) => { return User.findById(id, { "inventory.name": name }).exec() };
    const doc = await findObj(message.author.id);
    console.log(doc);
}
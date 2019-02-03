exports.meta = {
    name: "inventory",
    desc: "Display your inventory.",
    module: "Economy",
    enabled: true,
    whitelisted: false
};

exports.fn = function (client, message, args, guild) {
    const items = require("./../lib/items/items.js")
    const Discord = require('discord.js');
    const config = require("./../../config.js");
    const User = require('./../core/models/user.js');
    let nodoc = "Could not find document for " + message.author.id;
    const p = guild.config.prefix;
    let itemlist = [];
    var embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s inventory`)
        .setColor("A96075");

    if(args[0] === "view") {
        if (args[1] === undefined) return message.channel.send("What item would you like to look at " + message.author.username + "?");
        args.splice(0, 1);
        var subj = args.join(" ").toLowerCase();
        var founditem = false;
        items.forEach(item => {
            if (item.name.toLowerCase() === subj) {
                founditem = true;
                message.channel.send(new Discord.RichEmbed()
                .setTitle(item.name )
                .setDescription("Type: **" + item.type + "**\nValue: **" + item.value + "**")
                .setThumbnail(item.img64)
                .setColor("#c4ceff")
                );
            } 
        });
       if (founditem == false) message.channel.send("Are you sure that item exists?");
    } else {
    User.findById(message.author.id, function (err, doc) {
        if (err) { console.log(err); message.channel.send(config.errmsg); return }
        if (!doc) { console.log(nodoc); message.channel.send(config.errmsg); return }
        var values = ["Common", "Uncommon", "Rare", "Very rare"];
        for (let i = 0; i < values.length; i++) {
            itemlist[i] = doc.inventory.filter(item => item['value'] === values[i]);

            if (!(itemlist[i] === undefined || itemlist[i].length == 0)) {
                var val = "";
                for (let j = 0; j < itemlist[i].length; j++) {
                    val = val + `**${itemlist[i][j].qty}x** ${itemlist[i][j].name}\n`;
                }
                embed.addField(`\n**${values[i]} items**`, val, true);
            };
        }
       
        embed.setDescription(`You can buy mystery crates at the shop! To enter the shop, type \`${p}shop\`\nFor more details about an item, type \`${p}inventory view <item>\`\n`);
        message.channel.send(embed);
    });
}

}

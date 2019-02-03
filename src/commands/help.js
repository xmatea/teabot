exports.meta = {
    name: "help",
    desc: "Displays a general startup message.",
    usage: "<command>",
    module: "Core",
    enabled: true,
    whitelisted: false
}

exports.fn = function (client, message, args, guild) {
    const Discord = require("discord.js");
    const config = require("./../../config.js");
    let p = guild.config.prefix;

    message.channel.send(new Discord.RichEmbed()
    .setTitle("Hi, I'm Tea! :cherry_blossom:")
    .setDescription("Thank you for adding me here ♡ It really means a lot to me. I'll do my very best to make myself useful! Here's a quick setup guide:")
    .addField("Change my prefix", `By default, my prefix is \`${config.defaultSettings.prefix}\`\nTo change the current prefix, type \`${p}setprefix <new prefix>\``)
    .addField("Enable chatmode", `If it's okay for you guys, I can reply to certain messages in the chat! Enable or disable this with \`${p}chatmode on / off\``)
    .addField("Collect items", `Each day, you can claim 100 sakuras and use them to buy crates filled with cute items! Type \`${p}daily\` to claim your money or \`${p}shop\` to go to the shop.`)
    .addField("Explore other commands", `For a complete list of all my commands, type \`${p}commands\`\n\n`)
    .addField("Support", "Want to know more? Join my support server [here](https://discord.gg/2Q57hUS) for help, discussions and early access on upcoming features ♡ And, uhm, i-if you like me, do you mind [voting](https://discordbots.org/bot/474652348749316096/vote) for me at discordbots.org?")
    .setColor("#ffa5db")
    );
}
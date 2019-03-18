exports.meta = {
    name: "lottery", 
    desc: "Test your luck at the lottery!",
    module: "Fun",
    enabled: false,
    whitelisted: true
  };
  
  exports.fn = function (client, message, args) {
    if (args === undefined || args.length == 0) {
        return message.channel.send("Please specify an amount of money.");
    } 

    if (args[0].isNaN) {
        return message.channel.send("Uhm, that is not a number...");
    }

    const User = require("./../core/models/user.js");
    const config = require("./../config.js");
    var bet = args[0];
    var amount = bet;
    let rand = new Math.floor(Math.random());

    let embed;
    if (rand < 0.5) {
        amount *= -1;
        embed = new Discord.RichEmbed()
        .setTitle("You lost...")
        .setDescription(`Sorry ${message.author.username}, but you lost your **${bet}** :cherry_blossom:`);
    } else {
        amount *= (rand+1);
        embed = new Discord.RichEmbed()
        .setTitle("You won!")
        .setDescription(`Congratulations ${message.author.username}, you won **${amount}** :cherry_blossom:`);
    }

    User.updateOne({_id: message.channel.author}, 
        {$inc : {"bank.bal": amount} }, 
        (err) => {
            if (err) {
                message.channel.send(config.errmsg);
                return console.log(err);
            } else {
                if (amou)
                message.channel.send(new Discord.RichEmbed()
                .setDescription())
            }
        });
  }
  
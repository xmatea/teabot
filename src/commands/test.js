exports.meta = {
  name: "test",
  desc: "A simple test command for debugging.",
  module: "Core",
<<<<<<< HEAD
  enabled: false,
=======
  enabled: true,
>>>>>>> 6e1834beada3605e2939bdb3acddedcfc0000ce0
  whitelisted: false
};

exports.fn = function (client, message) {
<<<<<<< HEAD
    client.whitelist.set(message.author.tag, message.author.id);
    console.log(client.whitelist);
=======
  message.channel.send({embed: {
  "title": ":cherry_blossom::tea:Welcome to my Teaclub:tea::cherry_blossom:",
  "description": "Thanks for joining my support server! \n" +
  "Here, you can talk ask the admin questions, make suggestions for me and get help with any problems you might have ฅ(•ㅅ•❀)ฅ\n\n" +
  "I know rules are boring, but please read them in #♡-rules-♡ before you start chatting, okay?",
  "color": 5731671,
  "timestamp": new Date(),
  "footer": {
    "icon_url": client.user.avatarURL,
    "text": "u cute btw"
  },
  "thumbnail": {
    "url": "https://i.imgur.com/lMHUKvG.png"
  },
  "image": {
    "url": "https://i.imgur.com/VanWFXx.png"
  },
  "fields": [
    {
      "name": "Vote for me at discordbots.org!",
      "value": "You can vote [here](https://discordbots.org/bot/474652348749316096/).",
      "inline": true
    },
    {
      "name": "Website",
      "value": "Click [here](http://www.teabot.tk) to go to my website.\n\n",
      "inline": true
    }
  ]
}
});
>>>>>>> 6e1834beada3605e2939bdb3acddedcfc0000ce0
}

module.exports = (client, defaultSettings) => {
  const Guild = require('./../core/models/guild.js');
  const User = require('./../core/models/user.js');
  const config = require('./../../config.js');

  client.guilds.forEach(guild => {
    Guild.findById(guild.id).then(doc => {
      if (doc) { return }
      else {
        const guildInst = new Guild({
          _id: guild.id,
          guildName: guild.name,
          guildSize: guild.members.size,
          ownerId: guild.ownerID,
          config: {
            prefix: defaultSettings.prefix,
            chatMode: defaultSettings.chatMode
          }
        });

        guildInst.save()
          .then(result => console.log(result))
          .catch(err => console.log(err))
        }
    });
});

client.users.forEach(user => {
  User.findById(user.id, function(err, doc) {
    if (user.bot) return;
    if (doc) return;
    else {
      const userInst = new User({
        _id: user.id,
        bank: {
          bal: 100,
          lastClaimed: null
        },
        whitelisted: config.defaultSettings.whitelisted
      });
      userInst.save()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  });
});

console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
client.user.setActivity("human | b.help");
}

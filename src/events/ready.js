module.exports = (client, defaultSettings) => {

  const mongoose = require('mongoose');
  const Guild = require('./../core/models/guild.js');
  client.guilds.forEach(guild => {
    if(!client.settings.has(guild.id)) {
      client.settings.set(guild.id, defaultSettings);
    }

     Guild.findById(guild.id).then(doc => {
       if (doc) { return }
       else {
         const guildInst = new Guild({
             _id: guild.id,
             guildName: guild.name,
             guildSize: guild.members.size,
           });

         guildInst.save()
           .then(result => console.log(result))
           .catch(err => console.log(err))
         }
     });
  });

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("human | t.help");
}

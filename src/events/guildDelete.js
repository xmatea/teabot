module.exports = (client, guild) => {
    const Guild = require('./../core/models/guild.js');
    Guild.deleteOne({ _id: guild.id }, function (err) {
        if (err) console.log(err);
      });
      
      console.log(`left guild ${guild.id} with ${guild.members.size} users.`);
}

  
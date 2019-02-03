module.exports = (client, guild) => {
    const Guild = require('./../core/models/guild.js');
    Guild.deleteOne({ _id: guild.id }, function (err) {
        if (err) console.log(err);
      });
      
      console.log(`I have left a new guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);
}

  
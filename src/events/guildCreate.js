module.exports = (client, guild, defaultSettings) => {
    const Guild = require('./../core/models/guild.js');

    const guildInst = new Guild({
        _id: guild.id,
        guildName: guild.name,
        guildSize: guild.members.size,
        config: {
          prefix: defaultSettings.prefix,
          chatMode: defaultSettings.chatMode
        }
      });
    
    guildInst.save()
    .then(result => console.log(result))
    .catch(err => console.log(err))
    console.log(`I have joined a new guild with ${(guild.members.size) - 1} users. ID: ${guild.id}`);
}

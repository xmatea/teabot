module.exports = (client, guild, defaultSettings) => {
    const Guild = require('./../core/models/guild.js');
    const guildInst = new Guild({
        _id: guild.id,
        guildName: guild.name,
        guildSize: guild.members.size,
        addDate: new Date(),
        ownerID: guild.ownerID,
        config: {
          prefix: defaultSettings.prefix,
          chatMode: defaultSettings.chatMode
        }
      });
    
    guildInst.save()
    .then(result => console.log("new doc for guild " + guild.id))
    .catch(err => console.log(err))
    console.log(`left guild ${guild.id} with ${guild.members.size} users.`);
    client.channels.get("547462539211178013").send("I just joined a new server! I'm now in " + client.guilds.size + " guilds!");
}

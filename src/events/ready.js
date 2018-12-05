module.exports = (client, defaultSettings) => {
  //set guild configurations
  client.guilds.forEach(guild => {
    if(!client.settings.has(guild.id)) {
      client.settings.set(guild.id, defaultSettings);
    }
  });

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("human | t.help");
}

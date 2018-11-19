exports.meta = {
  name: "hug",
  usage: "Usage: <command> <user>",
  desc: "Give a hug to someone who needs it~",
  module: "Fun"
}

exports.gif = [
"https://i.imgur.com/lUlhllA.gif",
"https://i.imgur.com/r3miFkN.gif",
"https://i.imgur.com/PygWWvK.gif",
"https://i.imgur.com/s4Cv9i9.gif",
"https://i.imgur.com/JKU9tFq.gif",
"https://i.imgur.com/fZKuaQD.gif"
]

exports.fn = function(client, message, args) {
exports.speech = {
  defUser: `${message.author} just gave ${args[0]} a hug!.`,
  undefUser: `I think ${message.author} wants a hug...`,
  userSelf: `${message.author} gave themselves a hug. I guess that's possible..?`
}



}

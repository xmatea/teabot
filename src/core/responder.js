exports.fn = function (client, message, content) {
  const msg = message.content.toLowerCase();

  if (content[msg]) {
      var r =  Math.floor(Math.random() * (content[msg].length - 1));
      //message.channel.startTyping(3);
      //setTimeout(message.channel.stopTyping, 5);
      message.channel.send(content[msg][r]);
    }
 }

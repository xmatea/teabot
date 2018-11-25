exports.fn = function (client, message, respKeys) {
      let msg = message.content.toLowerCase();
      const respObj = require("./../lib/responses.json");
      var r =  Math.floor(Math.random() * (respObj[msg].length - 1));

      message.channel.startTyping(1);
      client.setTimeout(function(){message.channel.send(respObj[msg][r])}, 700);
      message.channel.stopTyping(true);
 }

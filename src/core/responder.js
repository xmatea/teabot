exports.fn = function (client, message, respKeys) {
<<<<<<< HEAD

      let msg = message.content.toLowerCase();
      const respObj = require("./../lib/responses.json");
      var r =  Math.floor(Math.random() * (respObj[msg].length - 1));
      message.channel.send(respObj[msg][r]);
=======
      let msg = message.content.toLowerCase();
      const respObj = require("./../lib/responses.json");
      var r =  Math.floor(Math.random() * (respObj[msg].length - 1));

      message.channel.startTyping(1);
      client.setTimeout(function(){message.channel.send(respObj[msg][r])}, 800);
      message.channel.stopTyping(true);
>>>>>>> experimental
 }

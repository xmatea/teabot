exports.addUser = function (id) {
    const User = require('./models/user.js');
    const config = require('../../config.js');
    const userInst = new User({
        _id: id,
        bank: {
            bal: 100,
            lastClaimed: null
        },
        whitelisted: config.defaultSettings.whitelisted
    });
    userInst.save()
        .then(result => console.log("new doc for member " + id))
        .catch(err => { console.log(err); message.channel.send(config.errmsg)});
}
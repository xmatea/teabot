module.exports = (member) => {
  const User = require('./../core/models/user.js');
  const config = require('./../../config.js');
  
  User.findById(member.id, function (err, doc) {
    if (member.bot) return;
    if (doc) return;
    if (err) console.log(err);
    else {
      const userInst = new User({
        _id: member.id,
        bank: {
          bal: 100,
          lastClaimed: null
        },
        whitelisted: config.defaultSettings.whitelisted
      });
      userInst.save()
        .then(result => console.log("new doc for member " + user.id))
        .catch(err => console.log(err))
    }
  });
}

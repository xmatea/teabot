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
        uname: member.user.tag,
        bank: {
          bal: 100,
          lastClaimed: null
        },
        whitelisted: config.defaultSettings.whitelisted
      });
      userInst.save()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  });
}

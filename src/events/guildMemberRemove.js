module.exports = (member) => {
    const User = require('./../core/models/user.js');
    User.deleteOne({ _id: member.id }, function (err) {
        if (err) console.log(err);
      });
}

  
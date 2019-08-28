exports.userObj = function (message, id) {
        id = id.substring(2).slice(0, -1);
        if (message.guild.members.get(id)) {
            return message.guild.members.get(id).user;
        }
        return false;
}

exports.userId = function (id) {
        return id.substring(2).slice(0, -1);
}
    
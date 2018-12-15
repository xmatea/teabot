const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: String,
    guildName: String,
    guildSize: Number
});

module.exports = mongoose.model("Guild", schema);

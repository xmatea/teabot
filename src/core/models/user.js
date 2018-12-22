const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: String,
    uname: String,
    bank: {
      bal: Number,
      hasClaimed: Boolean,
      lastClaimed: Date
    },
    inventory: Array,
    config: {}
});

module.exports = mongoose.model("User", schema);

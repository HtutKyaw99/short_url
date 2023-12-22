const mongoose = require("mongoose");
const shortid = require("shortid");

const ShortSchema = new mongoose.Schema({
  fullLink: {
    type: String,
    require: true,
  },
  shortLink: {
    type: String,
    require: true,
    default: shortid.generate(),
  },
});

module.exports = mongoose.model("ShortURL", ShortSchema);

const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);

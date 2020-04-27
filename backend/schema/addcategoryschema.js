var mongoose = require("mongoose");
var addcat = mongoose.Schema({
  name: "",
  image: ""
});
module.exports = mongoose.model("addcategoty", addcat);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name:String,
    role: Number
});

module.exports = User = mongoose.model("User", userSchema);

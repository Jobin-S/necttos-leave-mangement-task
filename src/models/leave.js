const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    status:{default:'requested', type:String},
    requestedDateTime: Date,
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps:true});

module.exports = Leave = mongoose.model("Leave", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const remindSchema = new Schema({
   text:String,
   updateObject:Object,
    remindTime:Date,
    timestamp:Date
});

module.exports = {remindSchema, mongoose};

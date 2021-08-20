var mongoose = require("mongoose");

var HelpSchema = new mongoose.Schema(

{
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },

 userId:{
    type:String,
    required:true
 },

 date:String,

 time:String,
}
)

module.exports = mongoose.model('help',HelpSchema)
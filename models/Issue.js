const mongoose = require('mongoose') //import mongoose
const Schema = mongoose.Schema;  //declare variable related to mongoose
const IssueSchema = new Schema({  //structure datapoints
formname: String,
subject:String,
email:String,
body: String,
image: String,
userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
});

const Issue = mongoose.model('Issue', IssueSchema); //Making a variable that accesses the database
module.exports = Issue //exports the variable so it becomes available to other files
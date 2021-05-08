var mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const data= new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    number :{
        type: Number,
        required : true
    },
    city: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }    
})
  module.exports = mongoose.model("Data1", data)
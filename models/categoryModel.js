const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"category title is required"],
    },
    imageUrl:{
        type:String,
        default:"https://www.freepik.com/free-photos-vectors/food-logo"
    }
}
,{timestamps:true})
//export 
module.exports = mongoose.model("Category",categorySchema);
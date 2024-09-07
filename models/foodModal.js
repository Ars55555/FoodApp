const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Food title is required"],
    },
    description:{
        type:String,
        required:[true,'food description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    imageUrl:{
        type:String,
        default:'https://www.freepik.com/free-photos-vectors/food-logo'
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'  // build relation b/w two schema
    },
    rating:{
        type:Number,
        default:5,
        min:1,
    },
    ratingCount:{
        type:String,

    },
}
,{timestamps:true})
//export 
module.exports = mongoose.model("foods",foodSchema);
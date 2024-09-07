const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Database ${mongoose.connection.host}`.bgCyan);
    }catch(e){
        console.log("DB Error",e , colors.bgRed);
    }
};
module.exports = connectDB;
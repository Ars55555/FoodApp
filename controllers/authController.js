const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async(req,res)=>{
    try {
        const {userName,email,password,phone,address,answer} = req.body;
        //validation
        if(!userName || !email || !password || !address || !phone ||!answer){
            return res.status(500).send({
                success:false,
                message:"Plz Provide all details"
            })
        }
        //check user
        const existing = await userModel.findOne({email});
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email Already Register Please Login",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //create new user
        const user = await userModel.create({
            userName,
            email,
            password : hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success:true,
            message:"Successfully Registered",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Register',
            error
        })
    }
};

// Login Controller

const loginController = async (req,res) =>{
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please Provide Email or Password"
            })
        }
        //check user 
        const user= await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            })
        }
        //is matched
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(500).send({
                success:false,
                message:"invalid credentials",
            })
        } 
        //token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        })
        
    }
}
module.exports = {registerController,loginController};
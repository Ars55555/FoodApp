const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const getUserController = async(req,res) =>{
    // res.status(200).send("User Data");
    // console.log(req.body.id);
    try {
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            });

        }
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"User get Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        })
    }
};
const updateUserController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //updation
        const {userName,address,phone} = req.body; ///[] & {}
        if(userName) user.userName = userName;
        if(address)  user.address = address;
        if(phone)  user.phone = phone;

        //save
        await user.save();
        res.status(200).send({
            success:true,
            message:"User Update Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in User Updation",
            error
        })
    }

}
const resetPasswordConntroller = async(req,res) =>{
    try {
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(404).send({
                success:false,
                message:"Please provide details"
            })
        }
        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found or invalid answer"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;

        await user.save();
        res.status(200).send({
            success:true,
            message:"Password reset successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in reset",
            error
        })
    }
}
const updatePasswordController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id});
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please enter Password"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid password"
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password updated",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in updation",
            error
        })
    }
}

const deleteUserController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Account deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Deletion",
            error
        })
    }
}
module.exports = {deleteUserController,getUserController,updateUserController,resetPasswordConntroller,updatePasswordController};
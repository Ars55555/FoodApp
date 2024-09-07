const categoryModel = require("../models/categoryModel");

//
const createCatController = async(req,res) =>{
    try {
        const {title,imageUrl} = req.body;
        if(!title){
            return res.status(404).send({
                success: false,
                message:"Title & image is neccessary"
            })
        }
        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"Category Created",
            newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create Category",
            error
        })
    }
}

const getAllCatController = async(req,res)=>{
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success: false,
                message:"Category not found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in fetching category",
            error
        })
    }
}

const updateController = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title,imageUrl}=req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"No Category Found",
            });
        }
        res.status(200).send({
            success:true,
            message:"Category updated Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:"false",
            message:"Error in updation",
            error
        })
    }
}
const deleteCatController = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:"Please provide Category for deletion"
            })
        }
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success:false,
                message:"No Category Found"
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deletion",
            error
        })
    }
}
module.exports = {createCatController,getAllCatController,updateController,deleteCatController};
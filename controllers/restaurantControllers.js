const restaurantModel = require("../models/restaurantModel");


const createRestaurantController = async(req, res)=>{
    try {
        const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logUrl,
        rating,
        ratingCount,
        code,
        coords,    
    } = req.body;

    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"Please fill the Required Details"
        });
    }
    const newRestaurant = new restaurantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logUrl,
        rating,
        ratingCount,
        code,
        coords,
    });

    await newRestaurant.save();

    res.status(201).send({
        success:true,
        message:"New Restaurant Created Successfully"
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in api Creation",
            error
        })
    }
}
const getAllController = async (req,res)=>{
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:"No Restaurant Available"
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get All Restaurant",
            error
        })
    }
}

const getRestaurantByIdController = async(req,res)=>{
    try{
        const restaurantId= req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"Not Found Restaurant Id"
            })
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId);
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"Restaurant Not Found",
                
            })
        }
        res.status(200).send({
            success:true,
            restaurant
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in finding This Restaurant",
            error
        })

    }
}
const deleteController = async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
            success:false,
            message:"Restaurant not found"
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success:true,
            message:"Restaurant Deleted Successfully"
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

module.exports={
    createRestaurantController,
    getAllController,
    getRestaurantByIdController,
    deleteController
};
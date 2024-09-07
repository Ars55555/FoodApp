const foodModal = require("../models/foodModal");
const orderModal = require("../models/orderModal");

const createFoodController = async(req,res)=>{
    try {
        const {title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating} = req.body;

        if(!title || !description || !price || !restaurant){
            return res.status(500).send({
                success:false,
                message:"Please Provide all fields"
            })
        }
        const newFood = new foodModal({
            title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating,
        });
        await newFood.save();
        res.status(201).send({
            success:true,
            message:"New Food Item Created",
            newFood,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creation of food api",
            error
        })
    }
}

const getAllFoodController = async(req,res)=>{
    try {
        const foods = await foodModal.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"no food item was found"
            })
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting food api",
        })
    }
}
const getFoodByIdController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Please provide id"
            })
        }
        const food = await foodModal.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food found"
            })
        }
        res.status(200).send({
            success:true,
            food,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Getting api error in finding food by id",
            error
        })
    }
}
//food by restaurant
const getFoodByResController = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"Please provide id"
            })
        }
        const food = await foodModal.find({restaurant:restaurantId});
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food found"
            })
        }
        res.status(200).send({
            success:true,
            food,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Getting api error in finding food by id",
            error
        })
    }
}
const updateFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Food id not found"
            })
        }
        const food = await foodModal.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food found"
            })
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        }= req.body;
        const updatedFood = await foodModal.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        },{new:true}) // new:true tbhi update hoga
    res.status(200).send({
        success:true,
        message:"Food item was updated successfully"
    })
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update food api",
            error
        })
    }
}
const deleteFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"provide id"
            })
        }
        const food = await foodModal.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"Food Not found"
            }) 
        }
        await foodModal.findByIdAndDelete(foodId);
        res.status(200).send({
            success:true,
            message:"Food Item Deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete api",
            error
        })
    }
}
const placeOrderController = async(req,res) =>{
    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(500).send({
                success:false,
                message:"Please add food cart or payment method"
            })
        }
        let total = 0;
        cart.map((i)=>{
            total+=i.price
        })

        const newOrder = new orderModal({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save() // used for storing in mongo database
        res.status(201).send({
            success:true,
            message:"Order Placed Successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Order API",
            error
        })
    }
}

const orderStatusController =async(req,res) =>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"Please provide valid order id"
            })
        }
        const {status} = req.body;
        const order = await orderModal.findByIdAndUpdate(orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:"Order Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Admin Panel"
        })
    }
}

module.exports = {
    createFoodController,
    getAllFoodController,
    getFoodByIdController,
    getFoodByResController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};
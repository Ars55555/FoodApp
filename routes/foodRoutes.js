const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByResController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//create routes
router.post('/create',authMiddleware,createFoodController);
//get all food
router.get('/getAll',getAllFoodController);
//get food by id

router.get("/get/:id",getFoodByIdController);
//food by res

router.get("/getByRes/:id",getFoodByResController);

//update food api
router.put("/update/:id",authMiddleware,updateFoodController);

//delete food
router.delete("/delete/:id",authMiddleware,deleteFoodController);

//place order
router.post('/placeorder',authMiddleware,placeOrderController)

//order status
router.post('/orderStatus/:id',authMiddleware,adminMiddleware,orderStatusController);
module.exports = router;
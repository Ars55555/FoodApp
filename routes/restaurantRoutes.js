const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllController, getRestaurantByIdController, deleteController } = require('../controllers/restaurantControllers');

const router = express.Router();

router.post("/create",authMiddleware,createRestaurantController);

// GET ALL RESTAURANTS || GET

router.get("/getAll",getAllController);

//GET RESTAURANT BY ID || GET METHOD
router.get("/get/:id",getRestaurantByIdController);

//DELETE RESTAURANT

router.delete("/delete/:id",authMiddleware,deleteController);
module.exports = router;
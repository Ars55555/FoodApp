const express = require("express");
const { createCatController, getAllCatController, updateController, deleteCatController } = require("../controllers/categoryController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes 
//CREATE CATEGORY
router.post("/create",authMiddleware,createCatController);

router.get("/getAll",getAllCatController);

router.put("/update/:id",authMiddleware,updateController);

router.delete("/delete/:id",authMiddleware,deleteCatController);

module.exports = router;
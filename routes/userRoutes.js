const express = require("express");
const { getUserController, updateUserController, resetPasswordConntroller, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes 

//GET USER || GET
router.get('/getUser',authMiddleware,getUserController);

//PUT
router.put('/updateUser',authMiddleware,updateUserController);

//reset password

router.post('/resetPassword',authMiddleware,resetPasswordConntroller);

//update password
router.post('/updatePassword',authMiddleware,updatePasswordController);

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteUserController);
module.exports = router;
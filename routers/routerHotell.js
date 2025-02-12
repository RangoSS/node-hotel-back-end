
import express from "express";

import {registerUser,loginUser,getAllUsers} from "../controller/userController.js"
//import {createShoppingList,updateShoppingList,deleteShoppingList,getAllShoppingLists} from "../controller/shoppingList.js"
import {getUserProfile ,updateUserProfile,deleteUserProfile} from "../controller/userProfile.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/user",protect, getUserProfile);
router.put("/user/:id",protect, updateUserProfile);
router.delete("/user/:id",protect, deleteUserProfile);
router.get("/user", getAllUsers);



export default router;

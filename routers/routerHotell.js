
import express from "express";

import {registerUser,loginUser} from "../controller/userController.js"
//import {createShoppingList,updateShoppingList,deleteShoppingList,getAllShoppingLists} from "../controller/shoppingList.js"
//import {getUserProfile ,updateUserProfile,deleteUserProfile} from "../controller/profileController.js"
//import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);





export default router;

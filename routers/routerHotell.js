
import express from "express";

import {registerUser,loginUser,getAllUsers} from "../controller/userController.js"
//import {createShoppingList,updateShoppingList,deleteShoppingList,getAllShoppingLists} from "../controller/shoppingList.js"
import {getUserProfile ,updateUserProfile,deleteUserProfile} from "../controller/userProfile.js"
import {addHotel,updateHotel,deleteHotel,getAllHotels,getAllHotelsAdmin} from "../controller/hotellController.js"
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/user",protect, getUserProfile);
router.put("/user/:id",protect, updateUserProfile);
router.delete("/user/:id",protect, deleteUserProfile);
router.get("/user", getAllUsers);
router.post("/hotel",protect,upload.array('images',5), addHotel);
router.put("/hotel/:id",protect, updateHotel);
router.delete("/hotel/:id",protect, deleteHotel);
router.get("/hotel",protect, getAllHotels);
router.get("/hotel",protect, getAllHotelsAdmin);




export default router;

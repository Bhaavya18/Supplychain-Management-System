import express, { Router } from "express";

const router = express.Router();
import { addOrder, deleteOrder,getOrder, getOrders, updateOrderStatus } from "../controllers/order.js";
import { verifyAdmin, verifyBusiness } from "../utils/verfiy.js";
//CREATE
router.post("/:businessid", verifyBusiness,addOrder);
//PUT
router.put("/:id", verifyAdmin,updateOrderStatus);
//DELETE
router.delete("/:businessid/:id", verifyBusiness,deleteOrder);
//GET
router.get("/find/:id", verifyBusiness,getOrder);
router.get("/", verifyAdmin,getOrders);

export default router;

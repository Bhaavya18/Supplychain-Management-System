import express from "express";
import {
  deleteBusiness,
  getBusiness,
  getBusinesses,
  updateBusiness,
  getWareHousesOfBusiness,
  getMyBusinessOrders
} from "../controllers/business.js";
import { verifyBusiness, verifyAdmin } from "../utils/verfiy.js";
const router = express.Router();
//UPDATE
router.put("/:id",verifyBusiness, updateBusiness);
//DELETE
router.delete("/:id", verifyAdmin,deleteBusiness);
//GET
router.get("/find/:id", verifyBusiness,getBusiness);
//GET ALL
router.get("/", verifyAdmin,getBusinesses);
router.get("/warehouse/:id", verifyBusiness,getWareHousesOfBusiness);
router.get("/order/:id", verifyBusiness, getMyBusinessOrders);
export default router;

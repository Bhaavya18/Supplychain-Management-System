import express from "express";
import {
  createWareHouse,
  deleteWareHouse,
  getWareHouse,
  updateWareHouse,
  getWareHouses,
  getCommodities,
} from "../controllers/wareHouse.js";
import { verifyAdmin,verifyBusiness } from "../utils/verfiy.js";
const router = express.Router();
//POST
router.post("/:businessid", verifyBusiness,createWareHouse);
//UPDATE
router.put("/:id",verifyBusiness,updateWareHouse);
//DELETE
router.delete("/:businessid/:id",verifyBusiness,deleteWareHouse);
//GET
router.get("/find/:id", verifyBusiness,getWareHouse);
router.get("/",verifyAdmin,getWareHouses);
router.get("/inventory/:id", verifyBusiness,getCommodities);
export default router;

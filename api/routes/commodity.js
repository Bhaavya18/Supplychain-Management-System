import express from "express";
import { createCommodity, getCommodity, updateCommodity, deleteCommodity } from "../controllers/commodity.js";
import { verifyBusiness } from "../utils/verfiy.js";
const router = express.Router();
//POST
router.post("/:warehouseid", verifyBusiness,createCommodity);
//UPDATE
router.put("/:id",verifyBusiness,updateCommodity);
//DELETE
router.delete("/:warehouseid/:id",verifyBusiness,deleteCommodity);
//GET
router.get("/:id", verifyBusiness,getCommodity);
export default router;

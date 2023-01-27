import Business from "../models/Business.js";
import Commodity from "../models/Commodity.js";
import WareHouse from "../models/WareHouse.js";
export const createWareHouse = async (req, res, next) => {
    const businessId = req.params.businessid;
    const newWareHouse = new WareHouse(req.body);
    try {
      const savedWareHouse = await newWareHouse.save();
      try {
        await Business.findByIdAndUpdate(businessId, {
          $push: { wareHouses: savedWareHouse._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedWareHouse);
    } catch (err) {
        next(err);
    }
}
export const updateWareHouse = async (req, res, next) => {
    try {
      const updatedWareHouse = await WareHouse.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedWareHouse);
    } catch (err) {
      next(err);
    }
}
export const deleteWareHouse = async (req, res, next) => {
   const businessId = req.params.businessid;
   try {
     await WareHouse.findByIdAndDelete(req.params.id);
     try {
       await Business.findByIdAndUpdate(businessId, {
         $pull: { inventory: req.params.id },
       });
     } catch (err) {
       next(err);
     }
     res.status(200).json("Warehouse has been deleted.");
   } catch (err) {
     next(err);
   }
};

export const getWareHouse = async (req, res, next) => {
  try {
    const wareHouse = await WareHouse.findById(req.params.id);
    res.status(200).json(wareHouse);
  } catch (err) {
    next(err);
  }
};
export const getWareHouses = async (req, res, next) => {
  try {
    const wareHouses = await WareHouse.find();
    res.status(200).json(wareHouses);
  } catch (err) {
    next(err);
  }
}
export const getCommodities = async (req, res, next) => {
  try {
    const wareHouse = await WareHouse.findById(req.params.id);
    const commodities = await Promise.all(wareHouse.inventory.map((cid) => {
      return Commodity.findById(cid);
    }));
    res.status(200).json(commodities);
  } catch (err) {
    next(err);
  }
}


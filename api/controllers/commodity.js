import Commodity from "../models/Commodity.js";
import WareHouse from "../models/WareHouse.js";
export const createCommodity = async (req, res, next) => {
  const wareHouseId = req.params.warehouseid;
  const newCommodity = new Commodity(req.body);
  try {
    const savedCommodity = await newCommodity.save();
    try {
      await WareHouse.findByIdAndUpdate(wareHouseId, {
        $push: { inventory: savedCommodity._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedCommodity);
  } catch (err) {
    next(err);
  }
};
export const updateCommodity = async (req, res, next) => {
  try {
    const updateCommodity = await Commodity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCommodity);
  } catch (err) {
    next(err);
  }
};
export const deleteCommodity = async (req, res, next) => {
  const wareHouseId = req.params.warehouseid;
  try {
    await Commodity.findByIdAndDelete(req.params.id);
    try {
      await WareHouse.findByIdAndUpdate(wareHouseId, {
        $pull: { inventory: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Commodity has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getCommodity = async (req, res, next) => {
  try {
    const wareHouse = await Commodity.findById(req.params.id);
    res.status(200).json(wareHouse);
  } catch (err) {
    next(err);
  }
};

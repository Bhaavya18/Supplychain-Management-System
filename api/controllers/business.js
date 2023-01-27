import Business from "../models/Business.js";
import WareHouse from "../models/WareHouse.js";
import Order from "../models/Order.js";
export const addBusiness = async (req, res, next) => {
  const addBusiness = new Business(req.body);

  try {
    const savedBusiness = await addBusiness.save();
    res.status(200).json(savedBusiness);
  } catch (err) {
    next(err);
  }
};

export const updateBusiness = async (req, res, next) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBusiness);
  } catch (err) {
    next(err);
  }
};

export const getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    res.status(200).json(business);
  } catch (err) {
    next(err);
  }
};

export const getBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (err) {
    next(err);
  }
};

export const deleteBusiness = async (req, res, next) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.status(200).json("Business has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getWareHousesOfBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    const wareHouse = await Promise.all(
      business.wareHouses.map((cid) => {
        return WareHouse.findById(cid);
      })
    );
    res.status(200).json(wareHouse);
  } catch (err) {
    next(err);
  }
};

export const getMyBusinessOrders = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    const orders = await Promise.all(
      business.orders.map((oid) => {
        return Order.findById(oid);
      })
    );
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

import Business from "../models/Business.js";
import Order from "../models/Order.js";
export const addOrder = async (req, res, next) => {
  const addOrder = new Order(req.body);
  const businessId = req.params.businessid; 
  try {
    const savedOrder = await addOrder.save();
    try {
      await Business.findByIdAndUpdate(businessId, {
        $push: { orders: savedOrder._id },
      });
    } catch (err) {
      next(err);
    }  
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};
export const updateOrderStatus = async (req, res, next) => {
    try {
      const updatedOrder=await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });  
      res.status(200).json(updatedOrder);  
    } catch (err) {
        next(err);
    }
}
export const deleteOrder = async (req, res, next) => {
    const businessId = req.params.businessid;
    try {
        await Order.findByIdAndDelete(req.params.id);
        try {
        await Business.findByIdAndUpdate(businessId, {
            $pull: { orders: req.params.id },
        });
        } catch (err) {
        next(err);
        }
        res.status(200).json("Order has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}
export const getOrder = async(req, res, next)=> {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).send(order);
    } catch (err) {
        next(err);
    }
}

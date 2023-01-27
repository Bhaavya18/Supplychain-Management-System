import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  price:{
      type: String,
      required:true,
  },
  qty: {
      type: String,
      required:true,
  },
  "commodityName": {
      type: String,
      required:true,
   },
  "status": {
      type: String,
      default:"processing"
  },
  "volume": {
      type: Number,
      required:true,
  }
  
});

export default mongoose.model("Order", OrderSchema);

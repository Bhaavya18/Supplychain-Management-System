import mongoose from "mongoose";
const CommoditySchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
      type: String,
      required: true,
  },  
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Commodity", CommoditySchema);
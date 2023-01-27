import mongoose from "mongoose";
const WarehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  maxVolume: {
    type: Number,
    required: true,
  },
  inventory: {
    type: [String],
  },
});

export default mongoose.model("Warehouse", WarehouseSchema);
/*
 Pollutry- 8
 Fruits- 10
 */

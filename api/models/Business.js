import mongoose from "mongoose";
const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    password: {
       type: String,
       required:true, 
    },
    wareHouses: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      deafult: false,
    },
    orders:[String]
  },
  { timestamps: true }
);

export default mongoose.model("Business", BusinessSchema);

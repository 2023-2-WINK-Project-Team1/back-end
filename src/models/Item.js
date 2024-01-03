import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  // add schema
  product_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  picture: {
    type: String,
    default: null,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

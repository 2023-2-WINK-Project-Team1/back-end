import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  // add schema
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

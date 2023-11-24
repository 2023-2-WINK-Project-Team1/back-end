import mongoose from "mongoose";

const test = new mongoose.Schema({
  // add schema
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Test = mongoose.model("Test", test);

export default Test;

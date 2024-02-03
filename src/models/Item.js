import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  type: { type: String, enum: ["expandable", "rental"], required: true },
  // type의 경우 둘 중 하나만 가능케 했다.
  //// expandable -> 소모품이다. 별도의 반납이 필요없다.
  //// rental -> 대여품이다. 반납 로직이 필요하다.
  //// 이 로직에 맞춰서 rental 스키마를 작성해야한다.
  count: { type: Number, default: 0 },
  filename: { type: String, default: null },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

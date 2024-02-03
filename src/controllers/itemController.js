import Item from "../models/Item";
import path from "path";
import fs from "fs";

// 모든 상품 정보 가져오기
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 상품 정보 가져오기 (params : id)
export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    // console.log(item);
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 상품 이미지 가져오기 (params : id)
export const getItemImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    return res
      .status(200)
      .sendFile(path.resolve(`src/resources/images/${item.filename}`));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 상품 정보 수정
export const updateItem = async (req, res) => {
  const { id } = req.params;

  // 수정은 상품 이름과 개수만 가능
  let { product_name, count } = req.body;

  const item = await Item.findById(id);

  product_name = product_name ? product_name : item.product_name;
  count = count ? count : item.count;

  try {
    await Item.findByIdAndUpdate(id, {
      product_name,
      count,
    });
    const updatedItem = await Item.findById(id);
    return res.status(200).json(updatedItem);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// 상품 삭제하기 (params : id)
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const { filename } = await Item.findById(id);
    // 이미지 삭제
    fs.unlinkSync(path.resolve(`src/resources/images/${filename}`));
    // db에서 데이터 삭제
    await Item.findByIdAndDelete(id);
    return res.status(200).send("상품 삭제 완료");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// 상품 추가하기
export const addItem = async (req, res) => {
  const allowedTypes = ["expandable", "rental"];
  console.log(req.body);

  const { product_name, type, count, filename } = req.body;
  if (!allowedTypes.includes(type)) {
    return res
      .status(400)
      .send("type 속성은 'expandable', 'rental' 중 하나여야합니다.");
  }
  try {
    await Item.create({ product_name, type, count, filename });
    return res.status(200).send("상품 추가 완료");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

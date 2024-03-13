import Item from "../models/Item";
import path from "path";
import fs from "fs";
import Image from "../models/Image";
import Rental from "../models/Rental";

// 모든 상품 정보 가져오기
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (!items) {
      return res.status(400).json({ message: "대여 가능한 상품이 없습니다." });
    }

    const updatedItems = [];

    for (const item of items) {
      const imageId = item.imageId;
      const image = await Image.findById(imageId);
      const data = image.image.data;

      // 대여신청된 개수 제외하고 보여주기
      let rentalCount = 0;

      await Rental.find({ item: item.id, approved: null }).then((rentals) => {
        rentals.forEach((rental) => {
          rentalCount += Number(rental.count);
        });
      });

      let result = item.toObject();
      result.count -= rentalCount;
      result.image = data;
      updatedItems.push(result);
    }

    return res.status(200).json(updatedItems);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 상품 정보 가져오기 (params : id)
export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(400).json({ message: "상품을 찾을 수 없습니다." });
    }

    const imageId = item.imageId;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(400).json({ message: "이미지를 찾을 수 없습니다." });
    }
    const data = image.image.data;
    const result = item.toObject();

    // 대여신청된 개수 제외하고 보여주기
    let rentalCount = 0;
    await Rental.find({ item: id, approved: null }).then((rentals) => {
      rentals.forEach((rental) => {
        rentalCount += Number(rental.count);
      });
    });

    result.count -= rentalCount;
    result.image = data;

    return res.status(200).json(result);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "상품을 찾을 수 없습니다." });
    }
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
    fs.unlinkSync(path.resolve(__dirname + `/../resources/images/${filename}`));
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
  const imageId = req.body.imageId;

  const { product_name, type, count } = req.body;
  if (!allowedTypes.includes(type)) {
    return res
      .status(400)
      .send("type 속성은 'expandable', 'rental' 중 하나여야합니다.");
  }
  try {
    await Item.create({ product_name, type, count, imageId });
    return res.status(200).send("상품 추가 완료");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

import Item from "../models/Item";

// 상품 정보 가져오기
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 상품 정보 수정
export const updateItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 상품 삭제하기
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 상품 추가하기
export const addItem = async (req, res) => {
  const { product_name, type, count } = req.body;
  // console.log(product_name, type, count);
  try {
    await Item.create({ product_name, type, count });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};

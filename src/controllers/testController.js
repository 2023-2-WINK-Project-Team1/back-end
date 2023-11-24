import Test from "../models/test";

// READ
export const getTest = async (req, res) => {
  console.log("get Test");
  const data = await Test.find({});
  console.log(data);
  return res.status(200).send(data);
};

// CREATE
export const createTest = async (req, res) => {
  const { title, text } = req.body;
  try {
    await Test.create({ title, text });
  } catch (e) {
    console.log(e);
    return res.status(500).send("fail");
  }

  return res.status(200).send("create success");
};

// UPDATE
export const updateTest = async (req, res) => {
  const { title, text } = req.body;

  await Test.updateOne({ title }, { text });
  return res.status(200).send("update success");
};

// DELETE
export const deleteTest = async (req, res) => {
  const id = req.body.id;
  await Test.findByIdAndDelete(id);

  return res.status(200).send("delete success");
};

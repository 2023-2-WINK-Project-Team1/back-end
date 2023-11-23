import express from "express";

const PORT = 4000;
const app = express();

const handleHome = (req, res) => {
  return res.end("Welcome to home");
};

const handleListening = () =>
  console.log(`✅ server listening on port http://localhost:${PORT} 🚀`);

app.get("/", handleHome);
app.listen(PORT, handleListening);

import "dotenv/config";
import "./db";
import "./models/AlertLog";
import "./models/Item";
import "./models/User";
import "./models/test";
import "./models/Rental";
import "regenerator-runtime";
import app from "./server";

// add js file

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);

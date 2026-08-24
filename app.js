const express = require("express");
// const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const cors = require("cors");
const imgRoutes = require('./middleware/upload')
const productRoutes = require("./routes/productRoutes");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

connectDB();

app.use('/auth', authRoutes)
app.use("/upload",imgRoutes)
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
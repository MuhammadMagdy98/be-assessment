const express = require("express");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const axios = require("axios");
const connectToDatabase = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();
app.use(userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

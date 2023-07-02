const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

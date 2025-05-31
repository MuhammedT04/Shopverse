const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require('./routes/user')
const AdminRouter = require('./routes/admin')

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use("/api/user/webhook", express.raw({ type: "application/json" }));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", router);
app.use("/api/admin", AdminRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

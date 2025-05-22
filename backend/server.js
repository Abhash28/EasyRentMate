const { config } = require("dotenv");
const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/DbConnect");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const rentCard = require("./routes/monthlyRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//configure the dot env file data
dotenv.config();

//db connection
dbConnect();
//form dotenv file inport port like   this
const PORT = process.env.PORT || 5000;

//Route
app.use("/api/auth", adminRouter);
app.use("/api/user", userRouter);
//monthly rent
app.use("/api/monthlyrent", rentCard);

app.listen(PORT, () => {
  console.log(`http://localhost: ${PORT}`);
});

//Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "something error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

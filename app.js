require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// // my routes
const authRoutes = require("./routes/auth");
const studentAuthRoutes = require("./routes/studentAuth");
const teacherRoutes = require("./routes/teacher");
//const studentRoutes = require("./routes/student");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");
// const paymentBRoutes = require("./routes/paymentBRoutes");

// DB CONNECTION

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// MIDDLEWARE

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES

app.use("/api", authRoutes);
app.use("/api/student", studentAuthRoutes);
//app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", paymentBRoutes);
//PORTS

const port = process.env.PORT || 8000;

// STARTING THE SERVER

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

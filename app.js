const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/db-conection");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())
app.set("views engine", "ejs");


app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);

app.listen(3000);
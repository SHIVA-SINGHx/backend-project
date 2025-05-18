const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const expressSession = require("express-session");


require("dotenv").config();


const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");



const db = require("./config/db-conection");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(flash());
// app.use(expressSession({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.EXPRESS_SESSION_SECRET,
// }))
app.set("view engine", "ejs"); 


app.get("/", (req, res)=>{
    res.render("home")
})


app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);

app.listen(3000); 
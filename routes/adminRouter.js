const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminModel = require("../models/adminmodel")
const upload = require("../config/multer")
const Admin = require("../models/adminmodel"); 
const Product = require("../models/product");   
const product = require("../models/product")
const Cart = require("../models/cart");


if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res)=>{
        res.send("hello ")
    })
}


router.get("/", (req, res) => {
    res.render("admin");
})

router.get("/owner", (req, res) => {
    res.render("createproduct");
})


router.post("/create-product", upload.single("image"), async (req, res) => {
  const { name, description, price, discount, adminEmail } = req.body;
  const imagePath = req.file ? req.file.filename : "";

  try {

    const newproduct = new Product({
      name,
      image: imagePath,
      description,
      price,
      discount,
    });
    await newproduct.save();

    const admin = await Admin.findOne({ email: adminEmail });
    if (admin) {
      admin.products.push({
        name,
        image: imagePath,
        description,
        price,
        discount,
      });
      await admin.save();
    }

    res.redirect("/admin/products");
  } catch (err) {
    res.status(500).send("Error creating product: " + err.message);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await product.find(); 
    res.render("productlist", { products });    
  } catch (err) {
    res.status(500).send("Error fetching products: " + err.message);
  }
});

router.get("/buy/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    const discountAmount = (product.price * product.discount) / 100;
    const finalPrice = product.price - discountAmount;

    res.render("buys", {
      product,
      finalPrice,
      discountAmount
    });
  } catch (err) {
    res.status(500).send("Error loading buy page");
  }
});

router.get("/products/cart", async (req, res) => {
  const cartItems = await Cart.find().populate("productId");

  const updatedCart = cartItems.map(item => {
    const product = item.productId;
    const discountAmount = (product.price * product.discount) / 100;
    const finalPrice = product.price - discountAmount;
    return {
      ...item.toObject(),
      productId: {
        ...product.toObject(),
        finalPrice
      }
    };
  });

  res.render("cart", { cartItems: updatedCart });
});

router.post("/products/add-to-cart/:id", async (req, res) => {
  const cartItem = new Cart({ productId: req.params.id });
  await cartItem.save();
  res.redirect("/admin/products/cart");
});

router.post("/products/add-to-cart/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const existingItem = await Cart.findOne({ productId: productId });

    if (!existingItem) {
      const cartItem = new Cart({ productId });
      await cartItem.save();
    }

    res.redirect("/admin/products/cart");
  } catch (err) {
    res.status(500).send("Error adding to cart: " + err.message);
  }
});

router.post("/products/remove-from-cart/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    await Cart.deleteOne({ productId });
    res.redirect("/admin/products/cart");
  } catch (err) {
    res.status(500).send("Error removing item: " + err.message);
  }
});


// router.post("/checkout/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).send("Product not found");

//   // You can save purchase to DB or show a success page
//   res.send(`You have purchased: ${product.name} at ₹${product.price - (product.price * product.discount) / 100}`);
// });


module.exports = router;
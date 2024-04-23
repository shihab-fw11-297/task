const express = require("express");
const { addProduct, getProduct, getSingle, updateProduct, destroyProduct, addReview,getAllReviews,getPublishedProduct } = require("../controller/productController");
const app = express.Router();

app.post("/create", addProduct);

app.get("/fetch", getProduct);

app.get("/fetch/:id", getSingle);

app.put("/update/:id", updateProduct);

app.delete("/delete/:id", destroyProduct);

app.post('/addReview/:id', addReview);

app.get('/allReviews/:id',getAllReviews)

app.get('/published', getPublishedProduct)


module.exports = app;
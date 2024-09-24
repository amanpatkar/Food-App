const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/getAllProduct", productController.getAllProduct);

module.exports = router;
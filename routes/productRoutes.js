const express = require("express");
const Product = require("../model/Product");

const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const products = await Product.find().sort({
            createdAt: -1
        });

        res.status(200).json(products);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});

module.exports = router;
const express = require("express");
const multer = require("multer");
const Product = require("../model/Product");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post("/", upload.single("file"), async (req, res) => {
    try {

        const product = await Product.create({
            name: req.body.name,
            image: req.file.path
        });

        res.status(201).json({
            message: "Product uploaded successfully!",
            product
        });

    } catch (e) {

        console.error(e);

        res.status(500).json({
            error: e.message
        });
    }
});

module.exports = router;
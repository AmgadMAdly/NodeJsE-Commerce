const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "uploads/")
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const filename = uuidv4() + "-" + Date.now() + ext;
        cb(null, filename)
    }
});

const upload = multer({storage});

const productController = require("../controllers/ProductController");

router.post("/createproduct", authorizeRoles(['admin']) ,productController.createProduct );
router.get("/getproducts",productController.getAllProducts);
router.get("/getProduct/:id",productController.getProductById);
router.put("/updateproduct/:id", authorizeRoles(['admin']) ,productController.updateProduct);
router.delete("/deleteproduct/:id", authorizeRoles(['admin']) ,productController.deleteProduct);

module.exports = router;
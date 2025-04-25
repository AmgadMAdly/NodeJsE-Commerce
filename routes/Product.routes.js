const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const productController = require("../controllers/ProductController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");
const { ValidateProduct } = require("../validation/ProductValidation");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "uploads/")
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const filename = uuidv4()+"-"+ Date.now() + ext;
        cb(null, filename)
    }
});

const upload = multer({storage:storage});


router.post("/createproduct",ValidateProduct ,authorizeRoles(['admin']),upload.single('image'),productController.createProduct );
router.get("/getproducts",productController.getAllProducts);
router.get("/getProduct/:id",productController.getProductById);
router.put("/updateproduct/:id", authorizeRoles(['admin']) ,productController.updateProduct);
router.delete("/deleteproduct/:id", authorizeRoles(['admin']) ,productController.deleteProduct);

module.exports = router;
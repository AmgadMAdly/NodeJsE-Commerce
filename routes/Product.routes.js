const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {createProduct,deleteProduct,getAllProducts,getProductById,updateProduct} = require("../controllers/ProductController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");
const { ValidateProduct } = require("../validation/ProductValidation");
const { asyncWarpper } = require("../utils/errHandler");
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


// router.post("/createproduct",ValidateProduct ,authorizeRoles(['admin']),upload.single('image'),asyncWarpper(createProduct) );
// router.get("/getproducts",authorizeRoles(['admin','customer']),asyncWarpper(getAllProducts));
// router.get("/getProduct/:id",authorizeRoles(['admin']),asyncWarpper(getProductById));
// router.put("/updateproduct/:id", authorizeRoles(['admin']) ,asyncWarpper(updateProduct));
// router.delete("/deleteproduct/:id", authorizeRoles(['admin']) ,asyncWarpper(deleteProduct));

router.post("/createproduct",ValidateProduct ,authorizeRoles(['admin']),upload.single('image'),createProduct) ;
router.get("/getproducts",authorizeRoles(['admin','customer']),getAllProducts);
router.get("/getProduct/:id",authorizeRoles(['admin']),getProductById);
router.put("/updateproduct/:id", authorizeRoles(['admin']) ,updateProduct);
router.delete("/deleteproduct/:id", authorizeRoles(['admin']) ,deleteProduct);

module.exports = router;
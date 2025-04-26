const authorizeRoles = require( "../middleware/RoleAuth.Middleware");
const {createCategory,getAllCategories,getCategorybyId,updateCategory,deleteCategory} = require("../controllers/CategoryController");

const express = require("express");
const { validateCreatCategory } = require("../validation/CategoryValidation");
const router = express.Router();


router.post("/createCategory",validateCreatCategory, authorizeRoles(['admin']) ,createCategory );
router.get("/getCategorys",getAllCategories);
router.get("/getCategory/:id",getCategorybyId);
router.put("/updateCategory/:id", authorizeRoles(['admin']) ,updateCategory);
router.delete("/deleteCategory/:id", authorizeRoles(['admin']) ,deleteCategory);

module.exports = router;
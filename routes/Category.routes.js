const authorizeRoles = require( "../middleware/RoleAuth.Middleware");

const express = require("express");
const router = express.Router();

const {createCategory,getAllCategories,getCategorybyId,updateCategory,deleteCategory} = require("../controllers/CategoryController");

router.post("/createCategory", authorizeRoles(['admin']) ,createCategory );
router.get("/getCategorys",getAllCategories);
router.get("/getCategory/:id",getCategorybyId);
router.put("/updateCategory/:id", authorizeRoles(['admin']) ,updateCategory);
router.delete("/deleteCategory/:id", authorizeRoles(['admin']) ,deleteCategory);

module.exports = router;
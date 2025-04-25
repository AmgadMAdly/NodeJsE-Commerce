const authorizeRoles = require( "../middleware/RoleAuth.Middleware");

const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/CategoryController");

router.post("/createCategory", authorizeRoles(['admin']) ,categoryController.createCategory );
router.get("/getCategorys",categoryController.getAllCategories);
router.get("/getCategory/:id",categoryController.getCategorybyId);
router.put("/updateCategory/:id", authorizeRoles(['admin']) ,categoryController.updateCategory);
router.delete("/deleteCategory/:id", authorizeRoles(['admin']) ,categoryController.deleteCategory);

module.exports = router;
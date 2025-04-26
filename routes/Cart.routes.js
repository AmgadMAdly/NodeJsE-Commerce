const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");


router.post('/AddCart', authorizeRoles(['customer']) , cartController.addToCart);
router.get('/getCart', authorizeRoles(['customer']) , cartController.getCart);
router.put('/UpdateCart', authorizeRoles(['customer']) , cartController.updateCart);
router.delete('/removeCartItem', authorizeRoles(['customer']) , cartController.removeCartItem);
router.delete('/clearCart', authorizeRoles(['customer']) , cartController.clearCart);

module.exports = router;
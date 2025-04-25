const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");


router.post('/AddCart', authorizeRoles(['Customer']) , cartController.addToCart);
router.get('/getCart', authorizeRoles(['Customer']) , cartController.getCartByUserId);
router.put('/UpdateCart', authorizeRoles(['Customer']) , cartController.updateCartItem);
router.delete('/removeCart', authorizeRoles(['Customer']) , cartController.removeCartItem);
router.delete('/clearCart', authorizeRoles(['Customer']) , cartController.clearCart);

module.exports = router;
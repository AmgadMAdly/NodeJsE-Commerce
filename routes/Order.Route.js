const express = require("express");

const router = express.Router();

const OrderController = require("../controllers/OrderController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");
const { validateCreateOrder,validateUpdateOrder } = require("../validation/OrderValidation");



router.post("/createOrder",validateCreateOrder ,authorizeRoles(['admin']),OrderController.createOrder );
router.get("/getOrders",authorizeRoles(['admin']),OrderController.getAllOrders);
router.get("/getOrderById/:id",OrderController.getOrderById);
router.get("/getUserOrder", authorizeRoles(['admin','customer']) ,OrderController.getUserOrders);
router.put("/updateOrder/:id",validateUpdateOrder, authorizeRoles(['admin']) , OrderController.updateOrder);
router.delete("/deleteOrder/:id", authorizeRoles(['admin']) , OrderController.deleteOrder);

module.exports = router;
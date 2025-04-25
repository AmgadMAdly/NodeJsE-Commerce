const express = require("express");

const router = express.Router();

const {createOrder,getAllOrders,getOrderById,getUserOrders,updateOrder,deleteOrder} = require("../controllers/OrderController");
const authorizeRoles = require("../middleware/RoleAuth.Middleware");
const { validateCreateOrder,validateUpdateOrder } = require("../validation/OrderValidation");



// router.post("/createOrder",validateCreateOrder ,authorizeRoles(['admin']),asyncWarpper(createOrder ));
// router.get("/getOrders",authorizeRoles(['admin']),asyncWarpper(getAllOrders));
// router.get("/getOrderById/:id",asyncWarpper(getOrderById));
// router.get("/getUserOrder", authorizeRoles(['admin','customer']) ,asyncWarpper(getUserOrders));
// router.put("/updateOrder/:id",validateUpdateOrder, authorizeRoles(['admin']) , asyncWarpper(updateOrder));
// router.delete("/deleteOrder/:id", authorizeRoles(['admin']) , asyncWarpper(deleteOrder));


router.post("/createOrder",validateCreateOrder ,authorizeRoles(['admin','customer']),createOrder );
router.get("/getOrders",authorizeRoles(['admin']),getAllOrders);
router.get("/getOrderById/:id",getOrderById);
router.get("/getUserOrder", authorizeRoles(['admin','customer']) ,getUserOrders);
router.put("/updateOrder/:id",validateUpdateOrder, authorizeRoles(['admin']) , updateOrder);
router.delete("/deleteOrder/:id", authorizeRoles(['admin']) , deleteOrder);
module.exports = router;
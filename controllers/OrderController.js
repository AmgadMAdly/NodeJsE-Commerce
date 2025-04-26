const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// create order
async function createOrder(req, res) {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    let calculatedTotal = 0;
    for (const item of cart.items) {
      if (!item.productId) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      
      if (item.productId.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.productId.name}` });
      }
      calculatedTotal += item.productId.price * item.quantity;
    }

    // Create order
    const order = new Order({ userId, items:cart.items.map(item =>({
      productId: item.productId._id,
      quantity: item.quantity
    })), shippingAddress, total:calculatedTotal });
    await order.save();

    // Update product quantities
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
      console.log(Product.findOne({ _id: item.productId }).quantity);
    }
    await Cart.deleteOne({userId});

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("items.productId", "name price");
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// get order by id
async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("userId", "name email").populate("items.productId", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


//get user orders

async function getUserOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate("userId", "name email").populate("items.productId", "name price");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ message: "User orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// update order
async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { shippingAddress, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { shippingAddress, status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//delete order
async function deleteOrder(req, res) {
    try{
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
    
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        res.status(200).json({ message: "Order deleted successfully" });
      }
      catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder
};
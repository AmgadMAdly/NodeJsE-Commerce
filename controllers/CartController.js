const { default: mongoose } = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");



async function addToCart(req, res, next) {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not authenticated" });
  }
  const { productId, quantity } = req.body;
  if (!productId || !mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid or missing productId" });
  }

  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Out Of Stock!" });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient product quantity available" });
  }

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  } else {
    cart = new Cart({
      userId,
      items: [{ productId, quantity }],
    });
  }

  await cart.save();
  res.status(200).json({
    message: "Item added to cart",
    Data: cart,
  });
}
async function getCart(req, res, next) {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (cart) {
    res.status(200).json({ cart });
  } else {
    const Error = new APIError("Couldn't fetching Cart", 400);
    next(Error);
  }
}
async function updateCart(req, res, next) {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart) res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({
      message: "Cart item updated",
      Data: cart,
    });
  } else {
    const Error = new APIError("Item not found in cart", 400);
    next(Error);
  }
}
async function removeCartItem(req, res, next) {
  const userId = req.user.id;

  const { productId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );

  if (cart) {
    res.status(200).json({ message: "Item removed", cart });
  } else {
    const Error = new APIError("Cart not found", 404);
    next(Error);
  }
}
async function clearCart(req, res, next) {
  const userId = req.user.id;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  if (cart) {
    res.status(200).json({
      message: "Cart cleared",
      Data: cart,
    });
  } else {
    const Error = new APIError("Cart not found", 404);
    next(Error);
  }
}

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
};

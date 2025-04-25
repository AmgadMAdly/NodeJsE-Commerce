const Cart = require("../models/Cart")

async function addToCart(req,res,next){
    const userId = req.user.id;
    const {ProductId, quantity} = req.body

    let cart = await Cart.findOne({userId});

    if(cart){
        const itemIndex = Cart.items.findIndex(item => item.productId.toString() === productId);
        if(itemIndex > -1){
            cart.items[itemIndex].quantity +=quantity;
        }else{
            cart.items.push({productId,quantity})
        }

    }else{
        cart =new Cart({
            userId,
            items: [{productId, quantity}],
        });
    }

    await cart.save();
    res.status(200).json({
        message: "Item added to cart",
        Data: cart
    })
}

async function getCart(req,res,next){
    const userId=req.user.id;
    
    // const cart

}
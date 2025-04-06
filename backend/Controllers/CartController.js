//CartController.js
const Cart = require("../models/Cart");
const Products = require("../models/Product"); // Product model is correctly imported

module.exports.addToCart = async (req, res) => {
    const { userId, productId,selectedSize } = req.body;

    try {
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            // Product already in cart, increase quantity
            cartItem.quantity += 1;
            await cartItem.save();
            return res.status(200).json({ message: "Cart updated", cartItem });
        } else {
            // Product not in cart, add new entry with quantity 1
            cartItem = new Cart({ userId, productId, quantity: 1 });
            cartItem.size = selectedSize;
            await cartItem.save();
            return res.status(201).json({ message: "Product added to cart", cartItem });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding to cart" });
    }
};


module.exports.getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.find({ userId }).populate("productId"); // Populate product details
        res.status(200).json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching cart items" });
    }
};


// Remove item from cart
module.exports.removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await Cart.findByIdAndDelete(cartItemId);
        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error removing item" });
    }
};
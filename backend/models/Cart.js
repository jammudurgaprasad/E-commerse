//Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Refers to the User collection
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Refers to the Product collection
        required: true,
    },
    size:{
        type:String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
    },
    addedAt: {
        type: Date,
        default: Date.now, // Auto-add timestamp when product is added
    }
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;

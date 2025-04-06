//Orders.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        require: false,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true,
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Possible order statuses
        default: "Processing", // Default status
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;

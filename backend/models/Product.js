//Product.js
const mongoose = require('mongoose');

const Product = new mongoose.Schema(
    {
        category: {
            type: String,
            required: false,
        },
        subcategory: {
            type: String,
            required: false,
        },
        subsubcategory: {
            type: String,
            required: false,
        },
        weartype: {
            type: String,
            required: false,
        },
        sizes: {
            type: Array,
            required: false,
        },
        brandname: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        actualprice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        finalprice: {
            type: Number,
            required: true,
        },
        minquantity: {
            type: Number,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
)

const Products = mongoose.model("product",Product);
module.exports = Products;
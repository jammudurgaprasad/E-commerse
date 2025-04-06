//EComroute.js
const {Router} = require('express');
const { getProduct, saveProduct, updateProduct, deleteProduct, getProductDetails } = require('../Controllers/EComcontroller');
const {addToCart,getCartItems,removeFromCart} = require('../Controllers/CartController');
const { addOrder, getOrders, cancelOrder } = require('../Controllers/OrdersController');
const {addAddress,getAddress, deleteAddress } = require('../Controllers/AddressController');
const {paymentRoute, paymentValidate} = require('../Controllers/PaymentController');
const router = Router();

router.get('/display',getProduct);
router.post('/upload',saveProduct);
router.post('/update_product', updateProduct);
router.delete('/delete_product/:_id', deleteProduct);
router.get('/productdetails/:_id',getProductDetails);
router.post('/add_to_cart', addToCart); // New route for adding to cart
router.get("/cart/:userId",getCartItems);
router.delete("/cart/:cartItemId",removeFromCart);
router.post("/add_address/:userId",addAddress);
router.get("/get_address/:userId", getAddress);
router.delete("/delete_address/:addressId", deleteAddress);
router.post('/place_order', addOrder);  // Add new route
router.get('/orders/:userId', getOrders);
router.put("/cancel_order/:orderId", cancelOrder);


//Razorpay
router.post("/order", paymentRoute);
router.post("/order/validate",paymentValidate);


// router.post('/delete_product',deleteProduct);

module.exports = router;
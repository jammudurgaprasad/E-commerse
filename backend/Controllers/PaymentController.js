const Razorpay = require('razorpay');
require("dotenv").config();
const crypto = require('crypto');

module.exports.paymentRoute = async(req,res) => {
    try{
        const { amount, currency, receipt } = req.body;
        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount, // Ensure amount is provided
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(500).send("Error creating order");
        }

        res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).send("Error processing payment");
    }
}

module.exports.paymentValidate = async(req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");
    if(digest !== razorpay_signature){
        return res.status(400).json({ msg : "Payment is invalid"});
    }

    res.json({
        status : "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    })
}
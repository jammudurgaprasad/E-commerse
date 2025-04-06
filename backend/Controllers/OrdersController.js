const Order = require("../models/Orders");
const Cart = require("../models/Cart");

module.exports.addOrder = async (req, res) => {
    const { userId,productId, quantity,addressId,size} = req.body;


try {
    const newOrder = new Order({
      userId,
      productId,
      quantity,
      size,
      addressId
    });
    await newOrder.save();
    await Cart.deleteMany({ userId }); // ✅ Clear cart after placing order

  res.status(201).json({ message: "Orders placed successfully", orders: newOrder });
} catch (error) {
  console.error("Error placing order:", error);
  res.status(500).json({ error: "Error placing order" });
}

};

module.exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch orders with populated product and address details
        const orders = await Order.find({ userId })
            .populate("productId")
            .populate("addressId");

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
};



module.exports.cancelOrder = async (req, res) => {
  try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      if (order.status !== "Processing") {
          return res.status(400).json({ error: "Order cannot be cancelled at this stage" });
      }

      order.status = "Cancelled";
      await order.save();

      res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
      console.error("Error cancelling order:", error);
      res.status(500).json({ error: "Error cancelling order" });
  }
};

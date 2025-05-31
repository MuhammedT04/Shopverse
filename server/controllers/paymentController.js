const stripe = require("stripe")(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const Order = require("../models/order");

const payment = async (req, res) => {
  try {
    const { product, userId } = req.body;

    const productData = product[0];
    const productInfo = productData.price_data.product_data;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: product,
      mode: "payment",
      success_url:
        "http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5000/cancel",

      metadata: {
        userId: userId || "",
        productName: productInfo.name,
        productDescription: productInfo.description || "",
        productImage: productInfo.images?.[0] || "",
        amount: (productData.price_data.unit_amount / 100).toString(),
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Payment session creation error:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
};

const handleWebHookEvent = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error(" Missing stripe-signature header");
    return res.status(400).send("Missing stripe-signature header");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(" Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Payment successful:", session);

      try {
        const newOrder = await Order.create({
          userId: session.metadata.userId || null,
          amount: parseFloat(session.metadata.amount),
          productName: session.metadata.productName,
          productDescription: session.metadata.productDescription,
          productImage: session.metadata.productImage,
          stripeSessionId: session.id,
          paymentMethod: "card",
        });

        console.log(" Order created successfully:", newOrder);
      } catch (error) {
        console.error(" Error creating order:", error);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

const getOrderBySessionId = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const order = await Order.findOne({ stripeSessionId: sessionId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

module.exports = { payment, handleWebHookEvent, getOrderBySessionId };

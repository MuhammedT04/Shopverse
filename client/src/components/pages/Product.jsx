import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_KEY = import.meta.env.STRIPE;
export default function Product() {
  const [products, setProducts] = useState([]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const AllProducts = async () => {
      try {
        const res = await api.get("/api/admin/allProduct");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    AllProducts();
  }, [products]);

  const makePayment = async ({ product }) => {
    try {
      const stripe = await loadStripe("pk_test_51RUVPBFVNkuglv91SwZQQdLVwoYSXTLq0xO2ahr95PvcCGCDVrdJqZ7qp55WTdOzTPYYNIGvl9yIZoCdLJxeHTkY00VAjVG9m2");

      const res = await api.post("/api/user/payment", {
        userId: user.id,
        product: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: product.ProductName,
                description: product.Description,
                images: [product.Image],
              },
              unit_amount: product.Price * 100,
            },
            quantity: 1,
          },
        ],
      });

      const result = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (err) {
      console.error("Stripe Payment Error:", err);
    }
  };

  return (
    <section className="container mx-auto px-1 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={` bg-white rounded-3xl p-6 relative overflow-hidden`}
          >
            <div className="absolute top-6 left-6 bg-white px-3 py-1 rounded-full text-sm font-medium">
              ₹ {product.Price}.00
            </div>

            <div className="h-48 flex items-center justify-center mb-4">
              <img
                src={product.Image || "/placeholder.svg"}
                alt={product.title}
                className="max-h-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {product.ProductName}
            </h3>
            <p className="text-gray-700 mb-4">{product.Description}</p>
            <button
              onClick={() => makePayment({ product })}
              className="inline-block bg-black text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

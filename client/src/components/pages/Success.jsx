import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import api from "../../api/axios";

const Success = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Order Successful!";
    window.scrollTo(0, 0);


    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetchOrderDetails(sessionId);
    } else {
      setError("No order session found");
      setLoading(false);
    }

    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowHighlight(true), 300);
  }, []);

  const fetchOrderDetails = async (sessionId) => {
    try {
      const response = await api.get(`/api/user/order/${sessionId}`);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to load order details");
      setLoading(false);
    }
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryStart = new Date(today);
    const deliveryEnd = new Date(today);
    deliveryStart.setDate(today.getDate() + 5);
    deliveryEnd.setDate(today.getDate() + 7);
    
    return `${deliveryStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${deliveryEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading order details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
          <a
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <main className="container mx-auto px-2 py-1 md:py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-6 md:p-12 space-y-10">
            <header className="text-center space-y-6">
              <div
                className={`inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-50 transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <svg
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="relative">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                  Su
                  <span className="relative inline-block">
                    cc
                    <span
                      className={`absolute h-[30%] bg-[#CCFF00] left-0 right-0 bottom-[0.2em] -z-10 transition-all duration-700 ease-out ${
                        showHighlight
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }`}
                      style={{ transformOrigin: "left" }}
                    ></span>
                  </span>
                  ess
                </h1>
              </div>

              <p
                className={`text-xl text-gray-600 max-w-lg mx-auto transition-all duration-500 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                Your order has been placed successfully. We've sent a
                confirmation to your email.
              </p>
            </header>

            {order && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Order Summary</h2>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="font-medium">{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <button
                    onClick={toggleExpand}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="font-medium">Order Details</div>
                    <div className="text-gray-500">
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                  </button>

                  <div
                    className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between py-2">
                        <div className="flex-1">
                          <div className="font-medium">{order.productName}</div>
                          {order.productDescription && (
                            <div className="text-sm text-gray-500 mt-1">
                              {order.productDescription}
                            </div>
                          )}
                          <span className="text-gray-500 text-sm">x1</span>
                        </div>
                        <div className="ml-4">
                          {order.productImage && (
                            <img
                              src={order.productImage}
                              alt={order.productName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Order Date</span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Payment Method</span>
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Estimated Delivery</span>
                        <span>{getEstimatedDelivery()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-lg font-semibold">
                    <span>Total Paid</span>
                    <span>₹{order.amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• You'll receive an email confirmation shortly</li>
                    <li>• We'll notify you when your order ships</li>
                    <li>• Track your package with the tracking number we'll send</li>
                    <li>• Expected delivery: {getEstimatedDelivery()}</li>
                  </ul>
                </div>
              </section>
            )}

            <div className="flex justify-center">
              <a
                href="/"
                className="inline-block bg-black text-white px-20 py-5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "../../context/storecontext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, placeOrder } = useStore();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const totalCartItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      alert("Please enter full delivery details!");
      return;
    }
    const trackingId = placeOrder(customer);
    alert(`Order Placed Successfully! Your Tracking ID: ${trackingId}`);
    navigate("/track");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#0b2319] border border-[#183d2d] flex items-center justify-center text-[#d4af37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-white">
            Your Basket is Empty
          </h2>
          <p className="text-xs text-[#a3b8af]">
            Explore our heritage grains, pure forest honey, and cold-pressed
            oils.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#183d2d] pb-5">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Shopping Basket
          </h1>
          <p className="text-xs text-[#a3b8af] mt-1">
            Review your harvest selections and complete delivery details.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-7 bg-[#0b2319] rounded-3xl border border-[#183d2d] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#183d2d] pb-4">
            <h2 className="font-serif text-lg font-bold text-white">
              Selected Items ({totalCartItems})
            </h2>
            <span className="text-xs text-[#d4af37] font-semibold">
              100% Native & Fresh
            </span>
          </div>

          <div className="divide-y divide-[#183d2d]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover bg-[#071a12] border border-[#183d2d] shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="text-sm font-serif font-bold text-white leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#738d81] mt-0.5">{item.unit}</p>
                    <span className="text-xs font-bold text-[#d4af37] mt-1 block">
                      ₹{item.price} each
                    </span>
                  </div>
                </div>

                {/* Counter & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-5">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 border border-[#183d2d] bg-[#071a12] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#123325] text-xs font-bold text-[#a3b8af] hover:text-white transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#f3e5ab]">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#123325] text-xs font-bold text-[#a3b8af] hover:text-white transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Total item price */}
                  <span className="text-sm font-serif font-bold text-[#d4af37] min-w-[70px] text-right">
                    ₹{item.price * item.qty}
                  </span>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#738d81] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Footer */}
          <div className="pt-4 border-t border-[#183d2d] flex justify-between items-center text-sm">
            <span className="text-[#a3b8af]">Subtotal Amount:</span>
            <span className="font-serif text-xl font-bold text-[#d4af37]">
              ₹{totalAmount}
            </span>
          </div>
        </div>

        {/* Right Side: Cash On Delivery Form */}
        <div className="lg:col-span-5 bg-[#0b2319] rounded-3xl border border-[#183d2d] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#183d2d] pb-4">
            <h2 className="font-serif text-lg font-bold text-white">
              Delivery Details
            </h2>
            <p className="text-xs text-[#a3b8af] mt-0.5">
              Cash on Delivery (Pay upon arrival)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your recipient name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1.5">
                Delivery Address *
              </label>
              <textarea
                required
                rows="3"
                placeholder="Door no, street name, landmark, pin code..."
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all resize-none"
              />
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-[#071a12] p-4 rounded-2xl border border-[#183d2d] space-y-2 text-xs">
              <div className="flex justify-between text-[#a3b8af]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-white">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-[#a3b8af]">
                <span>Shipping & Packaging</span>
                <span className="text-[#d4af37] font-semibold">
                  Free Delivery
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#183d2d]">
                <span>Payable on Delivery</span>
                <span className="text-[#d4af37] font-serif text-base">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              Confirm & Place Order (₹{totalAmount})
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#738d81] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              No advance payment needed • Inspect items on arrival
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useStore } from "../context/storecontext";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart } =
    useStore();

  const totalCartItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#081a13] border-l border-[#1d4131] shadow-2xl flex flex-col text-[#e8ece9]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#1d4131] flex items-center justify-between bg-[#06140e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-serif font-bold text-white">
                      Your Basket
                    </h2>
                    <span className="text-xs text-[#a3b8af]">
                      {totalCartItems} {totalCartItems === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-lg text-[#a3b8af] hover:text-[#f3e5ab] hover:bg-[#122e22] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#163527]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#0d241a] border border-[#1d4131] flex items-center justify-center text-[#d4af37]/60">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Your basket is empty
                      </p>
                      <p className="text-xs text-[#a3b8af] mt-1">
                        Select raw honey, cold-pressed oils, or heritage
                        millets.
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e5c558] text-[#06140e] font-bold rounded-xl text-xs transition-all shadow-md shadow-[#d4af37]/20"
                    >
                      Explore Catalog
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 flex gap-3.5 first:pt-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#0a1f17] shrink-0 border border-[#1d4131]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#a3b8af] mt-0.5">
                          {item.unit}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          {/* Stepper Buttons */}
                          <div className="flex items-center gap-1.5 border border-[#1d4131] bg-[#0c2219] rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#153829] text-xs font-bold text-[#a3b8af] hover:text-[#f3e5ab] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-[#d4af37]">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#153829] text-xs font-bold text-[#a3b8af] hover:text-[#f3e5ab] cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold text-[#d4af37]">
                              ₹{item.price * item.qty}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#1d4131] bg-[#06140e] space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#a3b8af]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">
                        ₹{subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#a3b8af]">
                      <span>Shipping</span>
                      <span className="text-[#d4af37] font-semibold">
                        Free Delivery
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1d4131]">
                      <span>Total</span>
                      <span className="text-[#d4af37] font-serif text-base">
                        ₹{subtotal}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] font-bold rounded-xl text-xs shadow-lg shadow-[#d4af37]/20 transition-all active:scale-98"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#738d81]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    Cash on Delivery available
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

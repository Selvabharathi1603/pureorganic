import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Sprout } from "lucide-react";
import { useStore } from "../context/storecontext";

export default function Navbar() {
  const { cart, openCart } = useStore();
  const totalCartItems = cart.reduce(
    (total, item) => total + (item.qty || 1),
    0,
  );

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 ${
      isActive
        ? "bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
        : "text-[#a3b8af] hover:text-[#f3e5ab] hover:bg-[#0f2c20]"
    }`;

  return (
    <div className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
      <header className="backdrop-blur-xl bg-[#091f16]/85 border border-[#1d4131] shadow-2xl shadow-black/60 rounded-full px-5 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#0d2e21] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sprout className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight text-[#fbfaf6] font-bold leading-none">
              Pure
              <span className="italic font-normal text-[#d4af37]">
                Organics
              </span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#d4af37]/80 font-semibold mt-0.5">
              Native Harvest
            </span>
          </div>
        </Link>

        {/* Floating Capsule Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#061710]/90 p-1 rounded-full border border-[#163527]">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Catalog
          </NavLink>
          <NavLink to="/track" className={navLinkClass}>
            Track Order
          </NavLink>
        </nav>

        {/* Cart Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#06140e] transition-transform group-hover:-translate-y-0.5" />
            <span className="tracking-wide uppercase text-[11px]">Bag</span>
            <span className="bg-[#06140e] text-[#f3e5ab] text-[10px] px-2 py-0.5 rounded-full font-bold">
              {totalCartItems}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

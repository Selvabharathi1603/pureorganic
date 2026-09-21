import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Truck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#06140e] via-[#040e0a] to-[#020705] text-[#a3b8af] pt-24 pb-12 mt-28 border-t border-[#1b4332]/60 overflow-hidden">
      {/* Ambient Gold & Forest Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-[#d4af37]/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[350px] bg-[#164e37]/15 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Newsletter & Brand Banner */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-[#d4af37]/40 via-[#1d4131] to-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="bg-[#081a13]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37]">
                <Sparkles className="w-3 h-3 text-[#d4af37]" /> Seasonal Harvest
                Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                Receive fresh batches, harvest updates &{" "}
                <span className="italic text-[#f3e5ab]">private sales</span>.
              </h3>
              <p className="text-xs text-[#738d81]">
                Zero spam. Only authentic seasonal harvest notices directly from
                local farms.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex-1 max-w-md"
            >
              <div className="relative flex items-center bg-[#05140e] border border-[#1d4131] rounded-full p-1.5 focus-within:border-[#d4af37] transition-all shadow-inner">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-5 pr-3 text-xs bg-transparent text-[#e8ece9] placeholder-[#557064] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-3" /> Joined
                    </>
                  ) : (
                    <>
                      Subscribe <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4 Trust Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="bg-[#081a13]/60 border border-[#163527] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0d2e21] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-snug">
                100% Native
              </h5>
              <p className="text-[11px] text-[#738d81] mt-0.5">
                Heritage heirloom seeds
              </p>
            </div>
          </div>

          <div className="bg-[#081a13]/60 border border-[#163527] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0d2e21] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-snug">
                Unrefined
              </h5>
              <p className="text-[11px] text-[#738d81] mt-0.5">
                Zero bleach or solvents
              </p>
            </div>
          </div>

          <div className="bg-[#081a13]/60 border border-[#163527] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0d2e21] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-snug">
                Trackable COD
              </h5>
              <p className="text-[11px] text-[#738d81] mt-0.5">
                Live order lookups
              </p>
            </div>
          </div>

          <div className="bg-[#081a13]/60 border border-[#163527] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0d2e21] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white leading-snug">
                Direct Sourcing
              </h5>
              <p className="text-[11px] text-[#738d81] mt-0.5">
                Fair farmer partnership
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 pb-12 border-b border-[#163527]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white group">
              <div className="w-9 h-9 rounded-full bg-[#0d2e21] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-transform duration-300">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Pure
                <span className="italic font-normal text-[#d4af37]">
                  Organics
                </span>
              </span>
            </Link>
            <p className="text-xs text-[#738d81] max-w-sm leading-relaxed">
              Preserving traditional farming lineages with slow-milled ancient
              millets, native cold-pressed oils, and raw forest flora honey
              delivered directly to your kitchen.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#071912] border border-[#1d4131] text-[11px] text-[#d4af37]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              Direct from South Indian farming collectives
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#d4af37]">
              Customer Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a3b8af]">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Organic Catalog (20 Items)
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Track Delivery Status
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Shopping Cart & COD
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#d4af37]">
              Harvest Types
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a3b8af]">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Millets & Grains
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Cold-Pressed Oils
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Forest Honey
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#f3e5ab] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Country Sugars
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Promise */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#d4af37]">
              Our Promise
            </h4>
            <div className="space-y-2 text-xs text-[#738d81] leading-relaxed">
              <p>✓ Zero artificial coloring</p>
              <p>✓ Wood-pressed below 45°C</p>
              <p>✓ Chemical-free descaling</p>
              <p className="text-[#d4af37] font-semibold pt-1">
                Cash on Delivery Available
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Philosophy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526a5e]">
          <p>© 2026 PureOrganics Store. All rights reserved.</p>
          <p className="font-serif italic text-[#d4af37]/80 text-sm">
            Wholesome harvest. Honest nutrition.
          </p>
        </div>
      </div>
    </footer>
  );
}

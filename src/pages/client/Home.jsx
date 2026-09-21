import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Compass,
} from "lucide-react";
import { useStore } from "../../context/storecontext";
import ProductCard from "../../components/ProductCard";

export default function Home() {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#092218] via-[#071c13] to-[#04100b] border border-[#1b4332] p-8 sm:p-16 lg:p-24 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f3e5ab] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> 100% Native &
            Chemical-Free
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            Wholesome harvest. <br />
            <span className="italic font-normal text-[#d4af37]">
              Pure nutrition.
            </span>
          </h1>

          <p className="text-[#c1d3cb] text-base sm:text-lg leading-relaxed max-w-lg font-light">
            “Zero heat. Zero chemicals. Zero rush. Pure harvest from hands that
            know the land.”
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] font-bold px-7 py-3.5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all duration-300 hover:gap-3 active:scale-95 text-xs uppercase tracking-wider"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#f3e5ab] hover:text-white hover:bg-[#123325] transition-colors border border-[#d4af37]/30 text-xs uppercase tracking-wider"
            >
              Track Order
            </Link>
          </div>
        </div>

        {/* Gold & Deep Green Ambient Aura */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[480px] h-[480px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#164e37]/30 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Trust Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-[#0b2319] border border-[#183d2d] hover:border-[#d4af37]/40 transition-all duration-300 space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">
            Zero Synthetic Pesticides
          </h3>
          <p className="text-xs text-[#a3b8af] leading-relaxed">
            Every grain is grown naturally on native soils without chemical
            enhancers, fertilizers, or bleaching agents.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0b2319] border border-[#183d2d] hover:border-[#d4af37]/40 transition-all duration-300 space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">
            Cold Wood-Pressed
          </h3>
          <p className="text-xs text-[#a3b8af] leading-relaxed">
            Crushed in traditional wooden chekkus below 45°C to preserve
            essential fatty acids, aroma, and native antioxidants.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0b2319] border border-[#183d2d] hover:border-[#d4af37]/40 transition-all duration-300 space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">
            Fair Farmer Collective
          </h3>
          <p className="text-xs text-[#a3b8af] leading-relaxed">
            100% direct remuneration back to regional farm producers with
            complete harvest trace-back on every batch.
          </p>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#183d2d] pb-5">
          <div>
            <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-widest">
              Selected Essentials
            </span>
            <h2 className="font-serif text-3xl font-normal text-white mt-1">
              Curated Farm Harvests
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
          >
            View Full Catalog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

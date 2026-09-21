import React, { useState } from "react";
import { Plus, Check, Star } from "lucide-react";
import { useStore } from "../context/storecontext";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative flex flex-col bg-[#0b2319] rounded-3xl p-3.5 border border-[#183d2d] hover:border-[#d4af37]/60 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] transition-all duration-500">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#071710]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-[#06140e]/90 backdrop-blur-md text-[#d4af37] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#d4af37]/30 shadow-sm">
          {product.category}
        </span>

        {/* Rating */}
        {product.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#06140e]/90 backdrop-blur-md text-[#f3e5ab] text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#1f4735]">
            <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
            <span>{product.rating}</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase">
            {product.unit}
          </span>
          <h3 className="font-serif text-lg font-bold text-white leading-snug mt-0.5 line-clamp-1 group-hover:text-[#f3e5ab] transition-colors">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs text-[#a3b8af] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Gold Quick-Add */}
        <div className="mt-5 pt-3 border-t border-[#183d2d] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#738d81] block">
              Price
            </span>
            <span className="text-xl font-extrabold text-[#d4af37] tracking-tight font-serif">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 cursor-pointer ${
              added
                ? "bg-[#d4af37] text-[#06140e] rotate-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-[#102d20] hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#06140e] hover:rotate-90 border border-[#1f4735] hover:border-[#d4af37]"
            }`}
            aria-label="Add to bag"
          >
            {added ? (
              <Check className="w-4 h-4 stroke-3" />
            ) : (
              <Plus className="w-4 h-4 stroke-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

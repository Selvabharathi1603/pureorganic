import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useStore } from "../../context/storecontext";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  const { products = [] } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Groceries",
    "Millets & Grains",
    "Cold-Pressed Oils",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.name
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
          Organic Store Catalog
        </h1>
        <p className="mt-1 text-xs text-[#a3b8af]">
          Delivering 100% natural, farm-fresh organic essentials straight to
          your doorstep.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0b2319] p-3 rounded-2xl border border-[#183d2d] shadow-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#738d81]" />
          <input
            type="text"
            placeholder="Search products (e.g. Honey, Oil, Millet)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#d4af37] text-[#06140e] shadow-md font-bold"
                  : "bg-[#071a12] text-[#a3b8af] hover:text-[#f3e5ab] hover:bg-[#102d20]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#a3b8af] px-1">
        <span>
          Showing <b className="text-[#d4af37]">{filteredProducts.length}</b>{" "}
          items
        </span>
        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-[#d4af37] hover:underline font-medium cursor-pointer"
          >
            Reset filter
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#0b2319] rounded-3xl border border-dashed border-[#183d2d]">
          <h3 className="text-[#a3b8af] text-sm font-semibold">
            No organic items found matching "{searchTerm}".
          </h3>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Search, AlertCircle, PackageCheck } from "lucide-react";
import { useStore } from "../../context/storecontext";
import TrackingStepper from "../../components/TrackingStepper";

export default function TrackOrder() {
  const { orders = [] } = useStore();
  const [inputTrackingId, setInputTrackingId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanId = inputTrackingId.trim().toUpperCase();
    const match = orders.find(
      (order) => order?.trackingId?.trim().toUpperCase() === cleanId,
    );
    setSearchedOrder(match || null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
          Track Your Organic Order
        </h1>
        <p className="text-xs text-[#a3b8af] max-w-md mx-auto">
          Enter your Order ID (e.g. ORG-123456) to see live delivery updates.
        </p>
      </div>

      {/* Lookup Form */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 bg-[#0b2319] p-2 rounded-2xl border border-[#183d2d] shadow-xl max-w-xl mx-auto"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#738d81]" />
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. ORG-123456)"
            value={inputTrackingId}
            onChange={(e) => setInputTrackingId(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] uppercase tracking-wider font-mono font-medium transition-all"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-md shadow-[#d4af37]/20 hover:brightness-110 transition-all cursor-pointer active:scale-95"
        >
          Track
        </button>
      </form>

      {/* Found Order Card */}
      {searchedOrder && (
        <div className="bg-[#0b2319] p-6 sm:p-8 rounded-3xl border border-[#183d2d] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#183d2d] pb-5">
            <div>
              <span className="text-xs text-[#738d81] font-medium">
                Order ID
              </span>
              <h2 className="text-xl font-mono font-bold text-[#d4af37]">
                {searchedOrder.trackingId}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#738d81] font-medium">
                Placed On
              </span>
              <p className="text-sm font-semibold text-white">
                {searchedOrder.date || "N/A"}
              </p>
            </div>
          </div>

          {/* Stepper Visualizer */}
          <TrackingStepper currentStatus={searchedOrder.status} />

          {/* Current Status Badge */}
          <div className="bg-[#071a12] border border-[#183d2d] p-4 rounded-2xl flex justify-between items-center text-sm">
            <span className="text-[#a3b8af] font-medium">Current Status:</span>
            <span className="bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              {searchedOrder.status || "Processing"}
            </span>
          </div>

          {/* Order Details */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Items in this order:
            </h4>
            <div className="divide-y divide-[#183d2d] border-t border-[#183d2d]">
              {(searchedOrder.items || []).map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between text-sm">
                  <span className="text-[#c1d3cb]">
                    {item.name}{" "}
                    <span className="text-[#738d81] text-xs">
                      ({item.unit}) × {item.qty}
                    </span>
                  </span>
                  <span className="font-semibold text-[#f3e5ab]">
                    ₹{(item.price || 0) * (item.qty || 1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#183d2d]">
              <span className="text-xs text-[#a3b8af] uppercase font-semibold">
                Total Paid:
              </span>
              <span className="text-lg font-bold font-serif text-[#d4af37]">
                ₹{searchedOrder.total}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No Order Found */}
      {hasSearched && !searchedOrder && (
        <div className="max-w-md mx-auto p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl flex items-center gap-3 text-rose-300 text-xs shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <p>
            No order found with ID "<b>{inputTrackingId}</b>". Please
            double-check your Order ID.
          </p>
        </div>
      )}
    </div>
  );
}

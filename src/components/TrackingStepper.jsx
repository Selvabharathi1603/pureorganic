import React from "react";
import { Check } from "lucide-react";

export default function TrackingStepper({ currentStatus = "Placed" }) {
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];
  const currentStepIndex = steps.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between max-w-xl mx-auto">
        {/* Background Track Line */}
        <div className="absolute left-6 right-6 top-4 h-1 bg-[#183d2d] -z-0" />

        {/* Animated Gold Progress Line */}
        <div
          className="absolute left-6 top-4 h-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-500 ease-in-out -z-0 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
          style={{
            width: `${Math.max(
              0,
              (currentStepIndex / (steps.length - 1)) * 88,
            )}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ring-4 ring-[#0b2319] ${
                  isDone
                    ? "bg-[#d4af37] text-[#06140e] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "bg-[#071a12] text-[#738d81] border border-[#183d2d]"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-3" /> : idx + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium tracking-tight ${
                  isCurrent
                    ? "text-[#f3e5ab] font-bold"
                    : isDone
                      ? "text-[#d4af37]"
                      : "text-[#738d81]"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

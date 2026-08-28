"use client";

import { PillButton } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "./cart-context";

export function CartSheet() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === "TECHFIRM10" || promoCode.trim().toUpperCase() === "WELCOME") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'TECHFIRM10'");
    }
  };

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col justify-between bg-white text-[#141432] border-l border-[#EDE8F5] shadow-2xl"
      >
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-[#EDE8F5] bg-[#F9FAFB]/70">
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-2xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <SheetTitle className="text-xl font-bold text-[#141432]">
                Your Cart
              </SheetTitle>
              <span className="ml-auto mr-8 px-2.5 py-0.5 rounded-full bg-[#7337F6] text-white text-xs font-bold">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            </div>
            <SheetDescription className="text-xs text-[#5C5C6E]">
              Review your managed services and cloud subscriptions.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 select-none">
              <div className="w-16 h-16 rounded-3xl bg-[#F0F2F5] flex items-center justify-center text-[#8B8B9E] mb-2">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-base font-bold text-[#141432]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#5C5C6E] leading-relaxed">
                  Looks like you haven&apos;t added any managed cloud plans or enterprise services yet.
                </p>
              </div>
              <div className="pt-3">
                <PillButton
                  href="/services"
                  variant="primary"
                  size="default"
                  onClick={() => setIsOpen(false)}
                >
                  Browse Services
                </PillButton>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl p-4 sm:p-5 bg-white border border-[#EDE8F5] shadow-2xs hover:border-primary/30 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7337F6] text-white mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#141432] leading-snug">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[11px] text-[#5C5C6E] line-clamp-1 mt-0.5 font-medium">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-[#8B8B9E] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#EDE8F5]/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-[#141432]">
                        ${item.price * item.quantity}
                      </span>
                      <span className="text-xs text-[#8B8B9E] font-medium">
                        {item.period}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#EDE8F5] rounded-full p-0.5 bg-[#F9FAFB]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#5C5C6E] hover:bg-white hover:text-[#141432] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#141432]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#5C5C6E] hover:bg-white hover:text-[#141432] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <div className="pt-2">
                {promoApplied ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>10% Promo Discount Applied!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPromoApplied(false);
                        setPromoCode("");
                      }}
                      className="text-emerald-700 underline text-[11px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B8B9E]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (e.g. TECHFIRM10)"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] text-[#141432] placeholder:text-[#8B8B9E] focus:outline-hidden focus:border-primary focus:bg-white transition-colors uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">
                    {promoError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#EDE8F5] bg-[#F9FAFB]/90 space-y-4">
            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5C6E]">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-[#141432]">${subtotal}.00</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount (10%)</span>
                  <span>-${discount}.00</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span>Security & SLA Guarantee</span>
                <span className="text-emerald-600 font-bold">Included</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EDE8F5] text-sm font-extrabold text-[#141432]">
                <span>Total Due Today</span>
                <span className="text-lg text-primary">${finalTotal}.00</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="space-y-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-primary hover:bg-[#7238EE] text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer select-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between text-[11px] text-[#8B8B9E] px-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

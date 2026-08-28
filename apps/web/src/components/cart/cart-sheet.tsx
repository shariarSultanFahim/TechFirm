"use client";

import React, { useState } from "react";
import Link from "next/link";

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

import { PillButton } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { useCart } from "./cart-context";

export function CartSheet() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalCount, subtotal } =
    useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (
      promoCode.trim().toUpperCase() === "TECHFIRM10" ||
      promoCode.trim().toUpperCase() === "WELCOME"
    ) {
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
        className="flex w-full flex-col justify-between border-l border-[#EDE8F5] bg-white p-0 text-[#141432] shadow-2xl sm:max-w-lg"
      >
        {/* Top Header */}
        <div className="border-b border-[#EDE8F5] bg-[#F9FAFB]/70 p-6 pb-4">
          <SheetHeader className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full shadow-2xs">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <SheetTitle className="text-xl font-bold text-[#141432]">Your Cart</SheetTitle>
              <span className="mr-8 ml-auto rounded-full bg-[#7337F6] px-2.5 py-0.5 text-xs font-bold text-white">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            </div>
            <SheetDescription className="text-xs text-[#5C5C6E]">
              Review your managed services and cloud subscriptions.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Item List */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 py-12 text-center select-none">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0F2F5] text-[#8B8B9E]">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-base font-bold text-[#141432]">Your cart is empty</h3>
                <p className="text-xs leading-relaxed text-[#5C5C6E]">
                  Looks like you haven&apos;t added any managed cloud plans or enterprise services
                  yet.
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
                  className="hover:border-primary/30 group relative flex flex-col justify-between rounded-2xl border border-[#EDE8F5] bg-white p-4 shadow-2xs transition-all sm:p-5"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <span className="mb-1 inline-block rounded-full bg-[#7337F6] px-2.5 py-0.5 text-[10px] font-bold text-white">
                        {item.category}
                      </span>
                      <h4 className="text-sm leading-snug font-bold text-[#141432]">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-[#5C5C6E]">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer rounded-lg p-1.5 text-[#8B8B9E] transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between border-t border-[#EDE8F5]/80 pt-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-[#141432]">
                        ${item.price * item.quantity}
                      </span>
                      <span className="text-xs font-medium text-[#8B8B9E]">{item.period}</span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center rounded-full border border-[#EDE8F5] bg-[#F9FAFB] p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#5C5C6E] transition-colors hover:bg-white hover:text-[#141432]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#141432]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#5C5C6E] transition-colors hover:bg-white hover:text-[#141432]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <div className="pt-2">
                {promoApplied ? (
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>10% Promo Discount Applied!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPromoApplied(false);
                        setPromoCode("");
                      }}
                      className="cursor-pointer text-[11px] text-emerald-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8B8B9E]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (e.g. TECHFIRM10)"
                        className="focus:border-primary w-full rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] py-2 pr-3 pl-9 font-mono text-xs text-[#141432] uppercase transition-colors placeholder:text-[#8B8B9E] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cursor-pointer rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-black"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="mt-1 pl-1 text-[11px] font-medium text-red-500">{promoError}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-[#EDE8F5] bg-[#F9FAFB]/90 p-6">
            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5C6E]">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-[#141432]">${subtotal}.00</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between font-semibold text-emerald-600">
                  <span>Promo Discount (10%)</span>
                  <span>-${discount}.00</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span>Security & SLA Guarantee</span>
                <span className="font-bold text-emerald-600">Included</span>
              </div>
              <div className="flex justify-between border-t border-[#EDE8F5] pt-2 text-sm font-extrabold text-[#141432]">
                <span>Total Due Today</span>
                <span className="text-primary text-lg">${finalTotal}.00</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="space-y-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-primary flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all select-none hover:bg-[#7238EE] hover:shadow-lg active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center justify-between px-1 pt-1 text-[11px] text-[#8B8B9E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="cursor-pointer transition-colors hover:text-red-500"
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

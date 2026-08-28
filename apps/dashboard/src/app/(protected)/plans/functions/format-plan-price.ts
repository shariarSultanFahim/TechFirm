export function formatPlanPrice(price: number, billingPeriod: string): string {
  const periodLabel = billingPeriod === "annual" ? "yr" : "mo";
  return `$${price.toFixed(2)}/${periodLabel}`;
}

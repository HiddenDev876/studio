import { PricingClient } from "./pricing-client";
import { DollarSign } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">Our Pricing Plans</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Simple, transparent pricing for individuals and teams. Choose the plan that's right for you.
        </p>
      </header>
      <PricingClient />
    </div>
  );
}

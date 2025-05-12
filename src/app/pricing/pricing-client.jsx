
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    frequency: "/month",
    description: "Get started with basic AI tools and features.",
    features: [
      "Access to 5 AI tools",
      "Limited daily usage",
      "Standard processing speed",
      "Community support",
    ],
    cta: "Get Started",
    icon: <Star className="h-7 w-7 text-muted-foreground" />,
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$10",
    frequency: "/month",
    description: "Unlock all AI tools and enhanced capabilities.",
    features: [
      "Access to all AI tools",
      "Increased daily usage limits",
      "Faster processing speed",
      "Priority email support",
      "Early access to new features",
    ],
    cta: "Choose Pro",
    icon: <Zap className="h-7 w-7 text-primary" />,
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "",
    description: "Tailored solutions for large teams and businesses.",
    features: [
      "Everything in Pro, plus:",
      "Custom usage limits",
      "Dedicated account manager",
      "API access (coming soon)",
      "Volume discounts",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    icon: <CheckCircle2 className="h-7 w-7 text-accent" />, // Using CheckCircle2 as a distinct icon
    isPopular: false,
  },
];

export function PricingClient() {
  const { toast } = useToast();

  const handleChoosePlan = (planName) => {
    // In a real app, this would redirect to a checkout or contact form
    toast({
      title: `Plan Selected: ${planName}`,
      description: planName === "Enterprise" 
        ? "Our sales team will contact you shortly." 
        : "Redirecting to sign up/checkout...",
    });
    console.log(`Chosen plan: ${planName}`);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {pricingPlans.map((plan) => (
        <Card 
          key={plan.name} 
          className={`flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ${plan.isPopular ? 'border-2 border-primary ring-2 ring-primary/50' : ''}`}
        >
          <CardHeader className="text-center items-center">
            {plan.icon}
            <CardTitle className="text-3xl font-bold mt-4">{plan.name}</CardTitle>
            <div className="mt-2">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              {plan.frequency && <span className="text-muted-foreground">{plan.frequency}</span>}
            </div>
            <CardDescription className="mt-3 min-h-[40px]">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full text-lg py-6 ${plan.isPopular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-accent hover:bg-accent/90 text-accent-foreground'}`}
              onClick={() => handleChoosePlan(plan.name)}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

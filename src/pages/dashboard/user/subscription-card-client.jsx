import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SubscriptionCardClient() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>Manage your subscription plan. (Placeholder)</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>Current Plan:</strong> Free Tier</p>
        <Button 
          className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" 
          onClick={() => alert("Subscription management not yet implemented.")}
        >
          Upgrade Plan
        </Button>
      </CardContent>
    </Card>
  );
}

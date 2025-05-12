
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, UserCircle, Settings, LogOut, Lightbulb, Mail, Edit3, Sparkles, Languages, History, SpellCheck } from "lucide-react";
import Link from "next/link";
import { UserHistoryClient } from "./user-history-client";

export const metadata = {
  title: 'User Dashboard - TextTransformer',
  description: 'Manage your TextTransformer account and access AI tools.',
};

const quickAccessTools = [
  { name: "Polish Email", href: "/ai-tools/polish-email", icon: <Mail className="h-5 w-5" /> },
  { name: "Summarize", href: "/ai-tools/summarize", icon: <Edit3 className="h-5 w-5" /> },
  { name: "Generate Content", href: "/ai-tools/generate-content", icon: <Sparkles className="h-5 w-5" /> },
  { name: "Grammar Check", href: "/ai-tools/grammar-check", icon: <SpellCheck className="h-5 w-5" /> },
];

export default function UserDashboardPage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between pb-6 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <LayoutDashboard className="h-8 w-8 mr-3 text-primary" />
            User Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <Button variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <UserCircle className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => alert("Edit Profile page/modal not yet implemented.")}>
              <Settings className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Access AI Tools</CardTitle>
            <CardDescription>Jump right back into your favorite tools.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickAccessTools.map((tool) => (
              <Link href={tool.href} key={tool.name} legacyBehavior>
                <a className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-card hover:bg-muted/50">
                  <div className="flex items-center mb-2 text-primary">{tool.icon}</div>
                  <h3 className="font-semibold">{tool.name}</h3>
                </a>
              </Link>
            ))}
             <Link href="/ai-tools" legacyBehavior>
                <a className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-card hover:bg-muted/50 text-center flex flex-col justify-center items-center">
                  <Lightbulb className="h-5 w-5 mb-2 text-primary"/>
                  <h3 className="font-semibold">View All Tools</h3>
                </a>
              </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
          <CardDescription>A summary of your recent interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserHistoryClient />
        </CardContent>
      </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
           <CardDescription>Manage your subscription plan. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Current Plan:</strong> Free Tier</p>
          <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => alert("Subscription management not yet implemented.")}>Upgrade Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}

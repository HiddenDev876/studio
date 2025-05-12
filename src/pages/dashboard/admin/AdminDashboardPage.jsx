import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, BarChart3, Settings, LogOut } from "lucide-react";
// import { Link } from "react-router-dom"; // No links needed for buttons for now

const stats = [
  { title: "Total Users", value: "1,234", icon: <Users className="h-6 w-6 text-blue-500" /> },
  { title: "Active Subscriptions", value: "567", icon: <BarChart3 className="h-6 w-6 text-green-500" /> },
  { title: "API Calls (24h)", value: "89,120", icon: <BarChart3 className="h-6 w-6 text-yellow-500" /> },
  { title: "Open Support Tickets", value: "12", icon: <ShieldAlert className="h-6 w-6 text-red-500" /> },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between pb-6 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <ShieldAlert className="h-8 w-8 mr-3 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Application overview and management tools.</p>
        </div>
         <Button variant="outline" size="sm" onClick={() => alert("Logout functionality not implemented.")}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month (mock)</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View, edit, or manage user accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">User search and management features will be available here.</p>
            <Button onClick={() => alert("View All Users not implemented.")}><Users className="mr-2 h-4 w-4"/> View All Users</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Configure global application settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Control API keys, feature flags, and maintenance mode.</p>
            <Button variant="outline" onClick={() => alert("Go to Settings not implemented.")}><Settings className="mr-2 h-4 w-4"/> Go to Settings</Button>
          </CardContent>
        </Card>
      </section>

       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>System Health</CardTitle>
           <CardDescription>Monitor the health and performance of the application services.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 font-semibold">All systems operational.</p>
        </CardContent>
      </Card>
    </div>
  );
}

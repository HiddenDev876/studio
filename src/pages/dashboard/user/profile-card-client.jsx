import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings } from "lucide-react";

export function ProfileCardClient({ user }) {
  return (
    <Card className="md:col-span-1 shadow-lg">
      <CardHeader>
        <UserCircle className="h-10 w-10 text-primary mb-2" />
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full" 
          onClick={() => alert("Edit Profile page/modal not yet implemented.")}
        >
          <Settings className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}

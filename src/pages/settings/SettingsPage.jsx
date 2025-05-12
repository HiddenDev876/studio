import { SettingsClient } from "./settings-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-start py-8">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <SettingsIcon className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">Account Settings</CardTitle>
          <CardDescription>
            Manage your profile information, password, and notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsClient />
        </CardContent>
      </Card>
    </div>
  );
}

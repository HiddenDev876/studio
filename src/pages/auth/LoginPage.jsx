import { LoginForm } from "./login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LockKeyhole className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">Login to TextTransformer</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
           <p className="mt-2 text-center text-sm text-muted-foreground">
            <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
              Forgot Password?
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

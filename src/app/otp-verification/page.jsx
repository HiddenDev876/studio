
import { OtpForm } from "./otp-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'OTP Verification - TextTransformer',
  description: 'Verify your account with OTP.',
};

export default function OtpVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">Verify Your Account</CardTitle>
          <CardDescription>
            An OTP has been sent to your registered email address. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Didn&apos;t receive the OTP?{" "}
            <button 
              onClick={() => console.log("Resend OTP clicked")} // Replace with actual resend logic
              className="font-semibold text-primary hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

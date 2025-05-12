"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { improveWriting } from "@/ai/flows/improve-writing";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string().min(10, { message: "Email text must be at least 10 characters." }).max(5000, {message: "Email text must be at most 5000 characters."}),
});

export function PolishEmailClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [improvedText, setImprovedText] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setImprovedText(null);
    try {
      const input = { text: data.text };
      const result = await improveWriting(input);
      setImprovedText(result.improvedText);
      toast({
        title: "Email Polished!",
        description: "Your email has been successfully improved by AI.",
      });
    } catch (error) {
      console.error("Error polishing email:", error);
      toast({
        title: "Error",
        description: "Failed to polish email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Email Draft</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your email draft here..."
                    className="min-h-[200px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Polishing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" /> Polish Email
              </>
            )}
          </Button>
        </form>
      </Form>

      {improvedText && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Improved Email</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={improvedText} readOnly className="min-h-[200px] bg-muted/30 text-base" />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(improvedText);
                toast({ title: "Copied!", description: "Improved email copied to clipboard."});
              }}
            >
              Copy Improved Email
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { summarizeText, type SummarizeTextInput } from "@/ai/flows/summarize-text"; // Using summarize as a proxy for insights

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string().min(20, { message: "Text must be at least 20 characters for meaningful insights." }).max(10000, {message: "Text must be at most 10000 characters."}),
});

type TextInsightsFormValues = z.infer<typeof formSchema>;

export function TextInsightsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<TextInsightsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data: TextInsightsFormValues) {
    setIsLoading(true);
    setInsights(null);
    try {
      const input: SummarizeTextInput = { text: data.text };
      // For "Text Insights", we'll use the summarizeText flow as a proxy.
      // A more specific "insights" flow could be developed later.
      const result = await summarizeText(input); 
      setInsights(result.summary);
      toast({
        title: "Insights Generated!",
        description: "Key insights/summary extracted from your text.",
      });
    } catch (error) {
      console.error("Error generating text insights:", error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
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
                <FormLabel className="text-lg">Your Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your text here to extract insights..."
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
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-5 w-5" /> Get Insights
              </>
            )}
          </Button>
        </form>
      </Form>

      {insights && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Generated Insights/Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={insights} readOnly className="min-h-[200px] bg-muted/30 text-base" />
             <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(insights);
                toast({ title: "Copied!", description: "Insights copied to clipboard."});
              }}
            >
              Copy Insights
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

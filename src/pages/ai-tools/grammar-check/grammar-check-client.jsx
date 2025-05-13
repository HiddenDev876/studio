import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Removed: import { checkGrammar } from "@/ai/flows/grammar-check-flow";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GENKIT_API_BASE_URL = "http://localhost:3400"; // Assuming Genkit dev server runs on 3400

const formSchema = z.object({
  text: z.string().min(5, { message: "Text must be at least 5 characters." }).max(10000, {message: "Text must be at most 10000 characters."}),
});

async function callGrammarCheckFlow(input) {
  const response = await fetch(`${GENKIT_API_BASE_URL}/grammarCheckFlow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const errorData = await response.text();
    console.error("API Error Data:", errorData);
    throw new Error(`API Error: ${response.status} - ${errorData || response.statusText}`);
  }
  return response.json();
}

export function GrammarCheckClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [correctedText, setCorrectedText] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setCorrectedText(null);
    try {
      const input = { text: data.text };
      const result = await callGrammarCheckFlow(input);
      setCorrectedText(result.correctedText);
      toast({
        title: "Grammar Checked!",
        description: "Your text has been successfully checked by AI.",
      });
    } catch (error) {
      console.error("Error checking grammar:", error);
      toast({
        title: "Error Checking Grammar",
        description: error.message || "Failed to check grammar. Please check console and ensure Genkit server is running.",
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
                    placeholder="Paste your text here to check for grammar and spelling errors..."
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
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Checking...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" /> Check Grammar
              </>
            )}
          </Button>
        </form>
      </Form>

      {correctedText !== null && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Corrected Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={correctedText} readOnly className="min-h-[200px] bg-muted/30 text-base" />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(correctedText);
                toast({ title: "Copied!", description: "Corrected text copied to clipboard."});
              }}
            >
              Copy Corrected Text
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

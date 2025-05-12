import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { summarizeText } from "@/ai/flows/summarize-text";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlignLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string().min(50, { message: "Text must be at least 50 characters to summarize effectively." }).max(20000, {message: "Text must be at most 20000 characters."}),
});

export function SummarizeClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setSummary(null);
    try {
      const input = { text: data.text };
      const result = await summarizeText(input); // Direct call
      setSummary(result.summary);
      toast({
        title: "Content Summarized!",
        description: "Your text has been successfully summarized.",
      });
    } catch (error) {
      console.error("Error summarizing content:", error);
      toast({
        title: "Error",
        description: "Failed to summarize content. Please try again.",
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
                    placeholder="Paste your long text, article, or document here..."
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
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Summarizing...
              </>
            ) : (
              <>
                <AlignLeft className="mr-2 h-5 w-5" /> Summarize Text
              </>
            )}
          </Button>
        </form>
      </Form>

      {summary && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={summary} readOnly className="min-h-[150px] bg-muted/30 text-base" />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(summary);
                toast({ title: "Copied!", description: "Summary copied to clipboard."});
              }}
            >
              Copy Summary
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

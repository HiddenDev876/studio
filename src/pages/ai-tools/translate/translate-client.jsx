import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Removed: import { translateText } from "@/ai/flows/translate-text";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GENKIT_API_BASE_URL = "http://localhost:3400"; // Assuming Genkit dev server runs on 3400

const supportedLanguages = [
  { code: "Spanish", name: "Spanish" },
  { code: "French", name: "French" },
  { code: "German", name: "German" },
  { code: "Italian", name: "Italian" },
  { code: "Portuguese", name: "Portuguese" },
  { code: "Dutch", name: "Dutch" },
  { code: "Russian", name: "Russian" },
  { code: "Japanese", name: "Japanese" },
  { code: "Korean", name: "Korean" },
  { code: "Chinese (Simplified)", name: "Chinese (Simplified)" },
  { code: "Arabic", name: "Arabic" },
  { code: "Hindi", name: "Hindi" },
];

const formSchema = z.object({
  text: z.string().min(2, { message: "Text must be at least 2 characters." }).max(5000, {message: "Text must be at most 5000 characters."}),
  targetLanguage: z.string({ required_error: "Please select a target language." }),
});

async function callTranslateTextFlow(input) {
  const response = await fetch(`${GENKIT_API_BASE_URL}/translateTextFlow`, {
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

export function TranslateClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      targetLanguage: supportedLanguages[0].code, // Default to first language
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setTranslatedText(null);
    try {
      const input = { text: data.text, targetLanguage: data.targetLanguage };
      const result = await callTranslateTextFlow(input);
      setTranslatedText(result.translatedText);
      toast({
        title: "Text Translated!",
        description: `Successfully translated to ${data.targetLanguage}.`,
      });
    } catch (error) {
      console.error("Error translating text:", error);
      toast({
        title: "Error Translating Text",
        description: error.message || "Failed to translate text. Please check console and ensure Genkit server is running.",
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
                <FormLabel className="text-lg">Text to Translate</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter text here..."
                    className="min-h-[150px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Target Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-base h-12">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code} className="text-base">
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Translating...
              </>
            ) : (
              <>
                <ChevronRight className="mr-2 h-5 w-5" /> Translate
              </>
            )}
          </Button>
        </form>
      </Form>

      {translatedText && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Translated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={translatedText} readOnly className="min-h-[150px] bg-muted/30 text-base" />
             <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(translatedText);
                toast({ title: "Copied!", description: "Translated text copied to clipboard."});
              }}
            >
              Copy Translation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useState, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const webSafeFonts = [
  { name: "System UI", value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { name: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Garamond", value: "Garamond, serif" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
  { name: "Brush Script MT", value: "'Brush Script MT', cursive" },
];

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter some text to transform." }).max(2000, {message: "Text must be at most 2000 characters."}),
  fontFamily: z.string({ required_error: "Please select a font." }),
  fontSize: z.number().min(8).max(72),
});

type FontTransformerFormValues = z.infer<typeof formSchema>;

export function FontTransformerClient() {
  const [previewStyle, setPreviewStyle] = useState<CSSProperties>({
    fontFamily: webSafeFonts[0].value,
    fontSize: "16px",
  });

  const form = useForm<FontTransformerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "The quick brown fox jumps over the lazy dog.",
      fontFamily: webSafeFonts[0].value,
      fontSize: 16,
    },
  });

  const textValue = form.watch("text");
  const fontValue = form.watch("fontFamily");
  const fontSizeValue = form.watch("fontSize");

  // No actual "submit", preview updates on change
  const handleValueChange = () => {
    setPreviewStyle({
      fontFamily: fontValue,
      fontSize: `${fontSizeValue}px`,
    });
  };
  
  // Call handleValueChange when relevant form fields change
  // React.useEffect(() => { handleValueChange(); }, [fontValue, fontSizeValue]);
  // Instead of useEffect, we can simply use the watched values directly in the preview.

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter text to preview..."
                    className="min-h-[100px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fontFamily"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Font Family</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-base h-12">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {webSafeFonts.map((font) => (
                        <SelectItem key={font.value} value={font.value} className="text-base" style={{fontFamily: font.value}}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fontSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Font Size: {field.value}px</FormLabel>
                  <FormControl>
                     <Slider
                      defaultValue={[field.value]}
                      min={8}
                      max={72}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="p-4 border rounded-md min-h-[150px] bg-muted/30 overflow-auto whitespace-pre-wrap break-words"
            style={{
              fontFamily: form.getValues("fontFamily"), // Use live value from form
              fontSize: `${form.getValues("fontSize")}px`, // Use live value from form
            }}
          >
            {textValue || "Your text preview will appear here."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

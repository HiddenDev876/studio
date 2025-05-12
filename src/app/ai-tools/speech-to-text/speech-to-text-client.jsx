
"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { transcribeSpeech } from "@/ai/flows/speech-to-text-flow";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UploadCloud, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// No form schema needed if we handle file input manually, but can keep it for structure or future text inputs.
const formSchema = z.object({
  // audioFile: z.any().optional(), // Not directly used by react-hook-form for file input in this setup
});

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac', 'audio/aac'];


export function SpeechToTextClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          title: "File too large",
          description: `Please select a file smaller than ${MAX_FILE_SIZE_MB}MB.`,
          variant: "destructive",
        });
        setSelectedFile(null);
        setFileName("");
        event.target.value = ""; // Reset file input
        return;
      }
      if (!ACCEPTED_AUDIO_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid audio file (e.g., MP3, WAV, OGG).",
          variant: "destructive",
        });
        setSelectedFile(null);
        setFileName("");
        event.target.value = ""; // Reset file input
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setTranscribedText(null); // Clear previous results
    } else {
      setSelectedFile(null);
      setFileName("");
    }
  };

  const readFileAsDataURI = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  async function onSubmit() {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to transcribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTranscribedText(null);
    try {
      const audioDataUri = await readFileAsDataURI(selectedFile);
      const input = { audioDataUri };
      const result = await transcribeSpeech(input);
      setTranscribedText(result.transcribedText);
      toast({
        title: "Transcription Complete!",
        description: "Your audio has been successfully transcribed.",
      });
    } catch (error) {
      console.error("Error transcribing speech:", error);
      toast({
        title: "Error",
        description: "Failed to transcribe speech. Please try again.",
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
          <FormItem>
            <FormLabel className="text-lg">Upload Audio File</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Input
                  id="audioFile"
                  type="file"
                  accept={ACCEPTED_AUDIO_TYPES.join(',')}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('audioFile')?.click()} className="flex-grow justify-start">
                  <UploadCloud className="mr-2 h-5 w-5" />
                  {fileName || "Choose an audio file..."}
                </Button>
              </div>
            </FormControl>
            {/* <FormMessage /> Removed as audioFile is not a react-hook-form field */}
             <p className="text-sm text-muted-foreground mt-1">
              Max file size: {MAX_FILE_SIZE_MB}MB. Supported types: MP3, WAV, OGG, etc.
            </p>
          </FormItem>
          
          <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || !selectedFile}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Transcribing...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" /> Transcribe Audio
              </>
            )}
          </Button>
        </form>
      </Form>

      {transcribedText !== null && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Transcribed Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={transcribedText} readOnly className="min-h-[200px] bg-muted/30 text-base" />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(transcribedText);
                toast({ title: "Copied!", description: "Transcribed text copied to clipboard."});
              }}
            >
              Copy Text
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

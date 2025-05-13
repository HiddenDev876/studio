import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Removed: import { transcribeAudioFile } from "@/ai/flows/transcribe-audio-flow";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UploadCloud, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GENKIT_API_BASE_URL = "http://localhost:3400"; // Assuming Genkit dev server runs on 3400

const MAX_FILE_SIZE_MB = 10; 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac', 'audio/aac', 'audio/x-m4a', 'audio/m4a'];


const formSchema = z.object({
  targetLanguage: z.string({ required_error: "Please select a target language." }),
});

async function callTranscribeAudioFlow(input) {
  const response = await fetch(`${GENKIT_API_BASE_URL}/transcribeAudioFlow`, {
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

export function TranscribeAudioClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetLanguage: "English",
    },
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
        event.target.value = ""; 
        return;
      }
      if (!ACCEPTED_AUDIO_TYPES.includes(file.type) && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav') && !file.name.endsWith('.m4a')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid audio file (e.g., MP3, WAV, M4A).",
          variant: "destructive",
        });
        setSelectedFile(null);
        setFileName("");
        event.target.value = ""; 
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setTranscribedText(null); 
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

  async function onSubmit(data) {
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
      const input = { audioDataUri, targetLanguage: data.targetLanguage };
      const result = await callTranscribeAudioFlow(input);
      setTranscribedText(result.transcribedText);
      toast({
        title: "Transcription Complete!",
        description: `Audio transcribed to ${data.targetLanguage}.`,
      });
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast({
        title: "Error Transcribing Audio",
        description: error.message || "Failed to transcribe audio. Please check console and ensure Genkit server is running.",
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
            <FormLabel className="text-lg">Upload Audio File (MP3, WAV, etc.)</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Input
                  id="audioFileUpload"
                  type="file"
                  accept={ACCEPTED_AUDIO_TYPES.join(',')}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('audioFileUpload')?.click()} className="flex-grow justify-start">
                  <UploadCloud className="mr-2 h-5 w-5" />
                  {fileName || "Choose an audio file..."}
                </Button>
              </div>
            </FormControl>
             <p className="text-sm text-muted-foreground mt-1">
              Max file size: {MAX_FILE_SIZE_MB}MB.
            </p>
          </FormItem>

          <FormField
            control={form.control}
            name="targetLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Transcription Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-base h-12">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="English" className="text-base">English</SelectItem>
                    <SelectItem value="Hindi" className="text-base">Hindi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || !selectedFile}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Transcribing Audio...
              </>
            ) : (
              <>
                <Languages className="mr-2 h-5 w-5" /> Transcribe
              </>
            )}
          </Button>
        </form>
      </Form>

      {transcribedText !== null && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Transcription Result</CardTitle>
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
              Copy Transcription
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

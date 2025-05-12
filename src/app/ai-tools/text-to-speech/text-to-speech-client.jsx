
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { convertTextToSpeech } from "@/ai/flows/text-to-speech-flow";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlayCircle, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  textToSpeak: z.string().min(5, { message: "Text must be at least 5 characters." }).max(1000, {message: "Text must be at most 1000 characters."}),
});

export function TextToSpeechClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState(null);
  const [conceptualMessage, setConceptualMessage] = useState(null);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToSpeak: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setAudioDataUri(null);
    setConceptualMessage(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    try {
      const input = { textToSpeak: data.textToSpeak };
      const result = await convertTextToSpeech(input);
      
      if (result.audioDataUri && result.audioDataUri.startsWith("data:audio")) {
        setAudioDataUri(result.audioDataUri);
        toast({
          title: "Audio Generated (Conceptual)",
          description: result.message || "Conceptual audio data has been prepared.",
        });
      } else {
         toast({
          title: "Notice",
          description: result.message || "Could not generate conceptual audio.",
          variant: "default"
        });
      }
      if (result.message) {
        setConceptualMessage(result.message);
      }

    } catch (error) {
      console.error("Error generating speech:", error);
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      // This is a placeholder data URI and won't play actual audio.
      // In a real scenario with actual audio data, this would work.
      // For demonstration, we'll just log that we would set the src.
      console.log("Setting audio source (conceptual):", audioDataUri);
      // audioRef.current.src = audioDataUri;
      // audioRef.current.load(); // Important to load the new source
    }
  }, [audioDataUri]);


  return (
    <div className="space-y-6">
       <Alert variant="default" className="bg-accent/20 border-accent/50">
        <VolumeX className="h-4 w-4 text-accent-foreground" />
        <AlertTitle className="text-accent-foreground font-semibold">Conceptual Feature</AlertTitle>
        <AlertDescription className="text-accent-foreground/80">
          This Text-to-Speech tool is for demonstration purposes. Actual audio generation is not implemented with the current AI model. The output below will be a placeholder.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="textToSpeak"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Text to Convert</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the text you want to convert to speech..."
                    className="min-h-[150px] text-base"
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
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Audio...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-5 w-5" /> Generate Speech
              </>
            )}
          </Button>
        </form>
      </Form>

      {audioDataUri && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Generated Audio</CardTitle>
            {conceptualMessage && <CardDescription className="text-center text-muted-foreground">{conceptualMessage}</CardDescription>}
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground">
              (Conceptual Audio Output - No actual sound will play)
            </p>
            <audio ref={audioRef} controls className="w-full">
              Your browser does not support the audio element.
            </audio>
            {/* 
            This button is more for a real scenario where audioDataUri is downloadable.
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                const link = document.createElement('a');
                link.href = audioDataUri;
                // Naming the download file based on current text or timestamp
                const fileName = form.getValues("textToSpeak").substring(0,20).replace(/\s/g, '_') || 'speech';
                link.download = `${fileName}.mp3`; // Assuming mp3, adjust if different
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast({ title: "Downloaded!", description: "Conceptual audio downloaded."});
              }}
            >
              Download Conceptual Audio
            </Button> 
            */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

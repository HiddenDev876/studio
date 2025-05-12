"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { transcribeSpeech } from "@/ai/flows/speech-to-text-flow";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mic, StopCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({}); // No form inputs needed for microphone recording

export function SpeechToTextClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(null); // null, true, or false
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const requestMicPermission = async () => {
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setHasMicPermission(true);
        return stream;
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setHasMicPermission(false);
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please enable microphone permissions in your browser settings.",
        });
        return null;
      }
    } else {
      setHasMicPermission(false);
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support microphone access.",
      });
      return null;
    }
  };

  // Attempt to get mic permission on mount or when permission state is unknown
  useEffect(() => {
    if (hasMicPermission === null && typeof window !== "undefined") {
      // Optional: could try a passive check or wait for user interaction
      // For now, we will request on first "Start" click.
    }
    // Cleanup stream on unmount
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [hasMicPermission]);


  const startRecording = async () => {
    setTranscribedText(null); // Clear previous results
    let stream = audioStreamRef.current;
    if (!stream || hasMicPermission === false) {
      stream = await requestMicPermission();
    }

    if (!stream) return;
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((prev) => [...prev, event.data]);
      }
    };
    mediaRecorderRef.current.onstop = handleTranscription;

    setAudioChunks([]);
    mediaRecorderRef.current.start();
    setIsListening(true);
    toast({ title: "Recording started", description: "Listening for your speech..." });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      // The onstop event will trigger handleTranscription
    }
    setIsListening(false);
     // Stop all tracks on the stream to turn off the mic indicator
    if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null; // Ensure we request a new stream next time
        setHasMicPermission(null); // Reset permission to re-check/re-request
    }
  };

  const readFileAsDataURI = useCallback((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  const handleTranscription = async () => {
    if (audioChunks.length === 0) {
      toast({ title: "No audio recorded", description: "Please try speaking again.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" }); // Standard type for MediaRecorder
    try {
      const audioDataUri = await readFileAsDataURI(audioBlob);
      const input = { audioDataUri };
      const result = await transcribeSpeech(input);
      setTranscribedText(result.transcribedText);
      toast({
        title: "Transcription Complete!",
        description: "Your speech has been successfully transcribed.",
      });
    } catch (error) {
      console.error("Error transcribing speech:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to transcribe speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setAudioChunks([]); // Clear chunks for next recording
    }
  };

  return (
    <div className="space-y-6">
      {hasMicPermission === false && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Microphone Access Denied</AlertTitle>
          <AlertDescription>
            TextTransformer needs microphone access to record audio. Please enable it in your browser settings and refresh the page.
          </AlertDescription>
        </Alert>
      )}
       {hasMicPermission === null && typeof window !== "undefined" && ( // Only show if not yet determined and in browser
        <Alert variant="default">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Microphone Access</AlertTitle>
          <AlertDescription>
            Click "Start Listening" to allow microphone access for speech transcription.
          </AlertDescription>
        </Alert>
      )}


      <Form {...form}>
        {/* Form is not strictly necessary here, but kept for structure */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              onClick={startRecording}
              className="w-full text-lg py-6 bg-green-600 hover:bg-green-700 text-white flex-1"
              disabled={isListening || isLoading || hasMicPermission === false}
            >
              <Mic className="mr-2 h-5 w-5" /> Start Listening
            </Button>
            <Button
              type="button"
              onClick={stopRecording}
              className="w-full text-lg py-6 bg-red-600 hover:bg-red-700 text-white flex-1"
              disabled={!isListening || isLoading}
            >
              <StopCircle className="mr-2 h-5 w-5" /> Stop Listening
            </Button>
          </div>
           {isLoading && (
            <div className="flex items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Transcribing...
            </div>
          )}
        </form>
      </Form>

      {transcribedText !== null && !isLoading && (
        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Transcribed Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={transcribedText} readOnly className="min-h-[150px] bg-muted/30 text-base" />
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard.writeText(transcribedText);
                toast({ title: "Copied!", description: "Transcribed text copied to clipboard." });
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

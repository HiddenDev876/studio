
import { Mic } from 'lucide-react';
import { SpeechToTextClient } from './speech-to-text-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export const metadata = {
  title: 'Speech to Text - TextTransformer',
  description: 'Convert spoken audio from your microphone into written text using AI.',
};

export default function SpeechToTextPage() {
  return (
    <AIToolContainer
      title="AI Speech to Text"
      description="Use your device's microphone to record and transcribe speech into text."
      icon={<Mic className="h-12 w-12 text-primary" />}
    >
      <SpeechToTextClient />
    </AIToolContainer>
  );
}

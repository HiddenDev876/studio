
import { Mic } from 'lucide-react';
import { SpeechToTextClient } from './speech-to-text-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export const metadata = {
  title: 'Speech to Text - TextTransformer',
  description: 'Convert spoken audio into written text using AI.',
};

export default function SpeechToTextPage() {
  return (
    <AIToolContainer
      title="AI Speech to Text"
      description="Transcribe audio recordings or spoken words into text. Upload an audio file to get started."
      icon={<Mic className="h-12 w-12 text-primary" />}
    >
      <SpeechToTextClient />
    </AIToolContainer>
  );
}

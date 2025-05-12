import { Mic } from 'lucide-react';
import { SpeechToTextClient } from './speech-to-text-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

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

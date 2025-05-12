import { Volume2 } from 'lucide-react';
import { TextToSpeechClient } from './text-to-speech-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function TextToSpeechPage() {
  return (
    <AIToolContainer
      title="AI Text to Speech"
      description="Transform your written content into audible speech. Enter your text below to generate audio. (Conceptual Feature)"
      icon={<Volume2 className="h-12 w-12 text-primary" />}
    >
      <TextToSpeechClient />
    </AIToolContainer>
  );
}

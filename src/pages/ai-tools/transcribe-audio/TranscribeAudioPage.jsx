import { FileAudio } from 'lucide-react';
import { TranscribeAudioClient } from './transcribe-audio-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function TranscribeAudioPage() {
  return (
    <AIToolContainer
      title="AI Audio Transcription"
      description="Upload an audio file (e.g., MP3) and get a text transcription in English or Hindi."
      icon={<FileAudio className="h-12 w-12 text-primary" />}
    >
      <TranscribeAudioClient />
    </AIToolContainer>
  );
}

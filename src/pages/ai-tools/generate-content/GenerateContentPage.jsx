import { Sparkles } from 'lucide-react';
import { GenerateContentClient } from './generate-content-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function GenerateContentPage() {
  return (
    <AIToolContainer
      title="Generate Content with AI"
      description="Need inspiration or a starting point? Provide a prompt and let our AI generate creative and relevant content for you."
      icon={<Sparkles className="h-12 w-12 text-primary" />}
    >
      <GenerateContentClient />
    </AIToolContainer>
  );
}

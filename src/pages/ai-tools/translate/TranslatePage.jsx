import { Languages } from 'lucide-react';
import { TranslateClient } from './translate-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function TranslatePage() {
  return (
    <AIToolContainer
      title="Translate Your Text"
      description="Easily translate text between various languages. Enter your text, choose the target language, and let AI do the rest."
      icon={<Languages className="h-12 w-12 text-primary" />}
    >
      <TranslateClient />
    </AIToolContainer>
  );
}

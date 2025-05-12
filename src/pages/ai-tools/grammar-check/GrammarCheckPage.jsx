import { SpellCheck } from 'lucide-react';
import { GrammarCheckClient } from './grammar-check-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function GrammarCheckPage() {
  return (
    <AIToolContainer
      title="AI Grammar Checker"
      description="Ensure your writing is clear, correct, and professional. Paste your text below and let AI help you fix grammar and spelling mistakes."
      icon={<SpellCheck className="h-12 w-12 text-primary" />}
    >
      <GrammarCheckClient />
    </AIToolContainer>
  );
}

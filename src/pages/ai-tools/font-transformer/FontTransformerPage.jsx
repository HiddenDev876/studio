import { Type } from 'lucide-react';
import { FontTransformerClient } from './font-transformer-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function FontTransformerPage() {
  return (
    <AIToolContainer
      title="Font Transformer"
      description="See how your text looks in various fonts. Type your text below and select a font to preview the transformation."
      icon={<Type className="h-12 w-12 text-primary" />}
    >
      <FontTransformerClient />
    </AIToolContainer>
  );
}

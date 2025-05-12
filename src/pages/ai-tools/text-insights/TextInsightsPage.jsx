import { Lightbulb } from 'lucide-react';
import { TextInsightsClient } from './text-insights-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function TextInsightsPage() {
  return (
    <AIToolContainer
      title="Get Text Insights"
      description="Unlock deeper understanding from your text. Paste your content below to extract key insights and summaries."
      icon={<Lightbulb className="h-12 w-12 text-primary" />}
    >
      <TextInsightsClient />
    </AIToolContainer>
  );
}

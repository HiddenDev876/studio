
import { Edit3 } from 'lucide-react';
import { SummarizeClient } from './summarize-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export const metadata = {
  title: 'Summarize Content - TextTransformer',
  description: 'Quickly get the gist of long articles, documents, or discussions using AI summarization.',
};

export default function SummarizePage() {
  return (
    <AIToolContainer
      title="Summarize Your Content"
      description="Condense long texts into brief, easy-to-understand summaries. Paste your content below to get started."
      icon={<Edit3 className="h-12 w-12 text-primary" />}
    >
      <SummarizeClient />
    </AIToolContainer>
  );
}

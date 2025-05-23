import { Mail } from 'lucide-react';
import { PolishEmailClient } from './polish-email-client';
import { AIToolContainer } from '@/components/ai/AIToolContainer';

export default function PolishEmailPage() {
  return (
    <AIToolContainer
      title="Polish Your Email"
      description="Let AI help you refine your email drafts for better clarity, tone, and professionalism. Paste your email below and see the improvements."
      icon={<Mail className="h-12 w-12 text-primary" />}
    >
      <PolishEmailClient />
    </AIToolContainer>
  );
}

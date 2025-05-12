
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))] text-center py-10">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-semibold text-foreground">Loading Page...</h1>
      <p className="text-muted-foreground">Please wait while we prepare the content.</p>
    </div>
  );
}

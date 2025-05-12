
import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">TextTransformer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TextTransformer. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="/data-privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Data Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
             <Link href="/extension-info" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Chrome Extension
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

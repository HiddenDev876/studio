import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center text-center py-10 px-4">
      <SearchX className="h-24 w-24 text-primary mb-8" />
      <h1 className="text-5xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
      </p>
      <div className="flex space-x-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/">Go to Homepage</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}

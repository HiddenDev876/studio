
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AIToolContainerProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function AIToolContainer({ title, description, icon, children }: AIToolContainerProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        {icon && <div className="mx-auto mb-4">{icon}</div>}
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

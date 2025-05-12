import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Edit3, Sparkles, History, FileText, SpellCheck, Languages } from "lucide-react";
import { formatDistanceToNowStrict } from 'date-fns';

const mockHistoryData = [
  {
    id: '1',
    toolName: 'Polish Email',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), 
    summary: 'Improved an email draft for client communication regarding Project Phoenix.',
    icon: <Mail className="h-5 w-5 text-primary" />,
  },
  {
    id: '2',
    toolName: 'Summarize Content',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), 
    summary: 'Summarized a long research paper on AI ethics and its impact on society.',
    icon: <Edit3 className="h-5 w-5 text-primary" />,
  },
  {
    id: '3',
    toolName: 'Generate Content',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), 
    summary: 'Generated blog post ideas about sustainable technology and future trends.',
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
  {
    id: '4',
    toolName: 'Text Insights',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), 
    summary: 'Analyzed customer feedback for sentiment and key themes for Q3 report.',
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
   {
    id: '5',
    toolName: 'Translate Text',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), 
    summary: 'Translated a product description from English to Spanish for market expansion.',
    icon: <Languages className="h-5 w-5 text-primary" />, 
  },
  {
    id: '6',
    toolName: 'Grammar Check',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), 
    summary: 'Checked and corrected grammar for a blog post introduction.',
    icon: <SpellCheck className="h-5 w-5 text-primary" />,
  },
];


export function UserHistoryClient() {
  const [formattedHistory, setFormattedHistory] = useState([]);

  useEffect(() => {
    const processedHistory = mockHistoryData.map(item => ({
      ...item,
      formattedTimestamp: formatDistanceToNowStrict(new Date(item.timestamp), { addSuffix: true }),
    })).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)); 
    setFormattedHistory(processedHistory);
  }, []);

  if (formattedHistory.length === 0) {
    return <p className="text-muted-foreground">No recent activity to display yet.</p>;
  }

  return (
    <ScrollArea className="h-[300px] pr-4"> 
      <div className="space-y-4">
        {formattedHistory.map((item) => (
          <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <CardTitle className="text-md font-medium">{item.toolName}</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">{item.formattedTimestamp}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

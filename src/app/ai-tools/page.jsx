
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BotMessageSquare, Edit3, Languages, Lightbulb, Mail, Sparkles, Type } from "lucide-react";
import Link from "next/link";

const aiTools = [
  {
    name: "Polish Email",
    description: "Refine your email drafts for clarity, tone, and impact.",
    icon: <Mail className="h-10 w-10 text-primary" />,
    href: "/ai-tools/polish-email",
  },
  {
    name: "Text Insights",
    description: "Extract key information and understand text sentiment.",
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    href: "/ai-tools/text-insights",
  },
  {
    name: "Summarize Content",
    description: "Get concise summaries of long articles or documents.",
    icon: <Edit3 className="h-10 w-10 text-primary" />,
    href: "/ai-tools/summarize",
  },
  {
    name: "Generate Content",
    description: "Create new text based on your prompts and ideas.",
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    href: "/ai-tools/generate-content",
  },
  {
    name: "Translate Text",
    description: "Translate text between various languages.",
    icon: <Languages className="h-10 w-10 text-primary" />,
    href: "/ai-tools/translate",
  },
  {
    name: "Font Transformer",
    description: "Preview your text in different font styles.",
    icon: <Type className="h-10 w-10 text-primary" />,
    href: "/ai-tools/font-transformer",
  },
];

export default function AiToolsPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <BotMessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">AI Powered Text Tools</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our suite of intelligent tools designed to enhance your text-based tasks.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiTools.map((tool) => (
          <Card key={tool.name} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              {tool.icon}
              <CardTitle className="mt-4 text-2xl">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription className="mb-6">{tool.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0 text-center">
               <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={tool.href}>
                  Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

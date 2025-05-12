
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, BookOpen, Mail, MessageSquareQuote } from "lucide-react"; 
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helpTopics = [
  {
    title: "Getting Started with TextTransformer",
    content: "To start using TextTransformer, navigate to the 'AI Tools' section. Select the tool you need, input your text, and let our AI do the work. Most tools provide clear instructions on their respective pages.",
  },
  {
    title: "Understanding Each AI Tool",
    content: "Each AI tool is designed for a specific purpose. 'Polish Email' helps refine your email drafts. 'Text Insights' provides summaries and key points. 'Summarize Content' creates concise versions of long texts. 'Generate Content' helps you brainstorm and write. 'Translate Text' converts text between languages. 'Font Transformer' lets you preview text in different fonts.",
  },
  {
    title: "Troubleshooting Common Issues",
    content: "If you encounter any issues, try refreshing the page. Ensure your internet connection is stable. If a tool isn't working as expected, check if your input text meets any specified requirements (e.g., length limits). For persistent problems, please contact our support team.",
  },
  {
    title: "Data Privacy and Security",
    content: "We take your data privacy seriously. Please refer to our 'Data Privacy' page for detailed information on how we handle your data. We do not store your transformed texts beyond your session unless explicitly stated for a feature like history (which is not yet implemented).",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to your questions and get support for TextTransformer.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions & Guides</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {helpTopics.map((topic, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg hover:text-primary">{topic.title}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {topic.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>User Guides</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore detailed guides for each feature. (Coming Soon)
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg">
          <CardHeader>
            <MessageSquareQuote className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Find answers to common questions in our <Link href="/faq" className="text-primary hover:underline">FAQ section</Link>.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg">
          <CardHeader>
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Can't find an answer? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

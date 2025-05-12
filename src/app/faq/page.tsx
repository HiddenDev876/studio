
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquareQuestion } from "lucide-react";

const faqItems = [
  {
    question: "What is TextTransformer?",
    answer:
      "TextTransformer is a suite of AI-powered tools designed to help you transform, analyze, and generate text. Our tools can assist with tasks like polishing emails, summarizing content, translating languages, and more.",
  },
  {
    question: "How do I use the AI tools?",
    answer:
      "Navigate to the 'AI Tools' section from the main menu. Select the specific tool you wish to use, input your text or prompt as required, and click the action button (e.g., 'Transform', 'Summarize'). The AI will process your request and display the output.",
  },
  {
    question: "Is my data safe with TextTransformer?",
    answer:
      "We prioritize your data privacy. Text inputs and outputs are processed securely. We generally do not store your text data beyond your current session unless a feature explicitly requires it (like a history feature, which is not yet implemented). For more details, please read our Data Privacy Policy.",
  },
  {
    question: "Are there any limits on text length or usage?",
    answer:
      "Currently, TextTransformer is offered with generous usage allowances. Some tools may have practical limits on input text length for optimal performance. If specific limits apply, they will be indicated on the tool's page. For very high volume usage, please contact us.",
  },
  {
    question: "What AI technology does TextTransformer use?",
    answer:
      "TextTransformer utilizes advanced large language models (LLMs) and natural language processing (NLP) technologies to power its features. We continuously update our models to provide the best possible results.",
  },
  {
    question: "Can I use TextTransformer for commercial purposes?",
    answer:
      "Yes, you can use the transformed or generated text for commercial purposes, subject to our terms of service. Please ensure your use complies with ethical AI practices and does not infringe on any third-party rights.",
  },
  {
    question: "What if I encounter an error or a tool isn't working?",
    answer:
      "First, try refreshing the page and checking your internet connection. If the issue persists, please note any error messages and contact our support team through the 'Contact Us' page with details about the problem.",
  },
  {
    question: "How often are new features added?",
    answer:
      "We are constantly working to improve TextTransformer and add new, valuable features. We announce major updates on our platform and through our communication channels.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <MessageSquareQuestion className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about TextTransformer.
        </p>
      </header>

      <section className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg shadow-sm bg-card">
              <AccordionTrigger className="p-6 text-lg font-medium hover:text-primary text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0 text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you can't find the answer you're looking for, please don't hesitate to reach out to us.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Contact Support
        </a>
      </section>
    </div>
  );
}

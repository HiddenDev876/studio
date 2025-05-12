
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit3, Languages, Lightbulb, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <Mail className="h-8 w-8 text-primary" />,
    title: "Polish Emails",
    description: "Refine your emails for clarity, tone, and professionalism.",
    link: "/ai-tools/polish-email",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Text Insights",
    description: "Gain deeper understanding and extract key information from text.",
    link: "/ai-tools/text-insights",
  },
  {
    icon: <Edit3 className="h-8 w-8 text-primary" />,
    title: "Summarize Content",
    description: "Quickly get the gist of long articles, documents, or discussions.",
    link: "/ai-tools/summarize",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Generate Content",
    description: "Create engaging text for various purposes, from ideas to full articles.",
    link: "/ai-tools/generate-content",
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: "Translate Text",
    description: "Break language barriers with accurate and natural translations.",
    link: "/ai-tools/translate",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Transform Your Text with <span className="text-primary">AI Power</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          TextTransformer provides a suite of AI tools to enhance your writing,
          understand text deeply, and generate compelling content effortlessly.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/ai-tools">
              Explore AI Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Placeholder Image Section */}
      <section className="w-full max-w-4xl">
        <Card className="overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/1200/600"
            alt="Abstract representation of AI text transformation"
            data-ai-hint="AI technology"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </Card>
      </section>
      
      {/* Features Section */}
      <section className="w-full max-w-5xl py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful AI Tools at Your Fingertips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{feature.description}</CardDescription>
                <Button variant="link" asChild className="mt-4 text-primary">
                  <Link href={feature.link}>
                    Try Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-16 bg-secondary/50 rounded-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Text?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sign up today and start transforming your text with the power of AI.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/ai-tools">
            Get Started for Free <Sparkles className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

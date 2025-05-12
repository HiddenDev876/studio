
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Zap, BotMessageSquare } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <BotMessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">About TextTransformer</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering you with cutting-edge AI to revolutionize how you interact with text.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-4">
            At TextTransformer, our mission is to make advanced AI text manipulation tools accessible to everyone. We believe that powerful technology can simplify complex tasks, enhance creativity, and improve communication. Whether you're a student, professional, or content creator, TextTransformer is designed to help you work smarter, not harder.
          </p>
          <p className="text-lg text-muted-foreground">
            We are committed to continuous innovation, user privacy, and providing a seamless experience. Our tools are built on state-of-the-art AI models, ensuring high-quality results for all your text transformation needs.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/600/400?grayscale"
            alt="Team working on AI"
            data-ai-hint="team collaboration"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose TextTransformer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Powerful AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Leverage the latest advancements in artificial intelligence for superior text processing and generation.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>User-Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Intuitive design and easy-to-use tools, making complex AI capabilities simple for everyone.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Versatile Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A comprehensive suite of tools to meet diverse text-related needs, from polishing emails to generating creative content.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-12 bg-secondary/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Become part of a growing community of users who are transforming their text and boosting their productivity with TextTransformer.
        </p>
      </section>
    </div>
  );
}

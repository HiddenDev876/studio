
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, Download, Settings, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'TextTransformer Chrome Extension',
  description: 'Learn how to install and use the TextTransformer Chrome Extension for quick access to AI tools.',
};

export default function ExtensionInfoPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-12">
        <Puzzle className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight">TextTransformer Chrome Extension</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Access your favorite AI text tools directly from your browser toolbar. Enhance your productivity with seamless integration.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/600/400?random=1"
            alt="Chrome extension icon in browser toolbar"
            data-ai-hint="browser extension"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
            <li>Quickly polish emails before sending.</li>
            <li>Summarize web pages or selected text instantly.</li>
            <li>Generate content ideas or drafts on the fly.</li>
            <li>Translate text without leaving your current tab.</li>
            <li>Easy access to all TextTransformer AI tools.</li>
          </ul>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">How to Install and Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <Download className="h-10 w-10 text-primary mx-auto mb-4" />
              <CardTitle>1. Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">The extension files are located in the `extension` folder of this project. You'll need to load it manually in Chrome.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <Settings className="h-10 w-10 text-primary mx-auto mb-4" />
              <CardTitle>2. Install in Chrome</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 text-left">
                <li>Open Chrome and go to `chrome://extensions`.</li>
                <li>Enable "Developer mode" (top-right).</li>
                <li>Click "Load unpacked".</li>
                <li>Select the `extension` folder from this project.</li>
                <li>The TextTransformer icon will appear in your toolbar.</li>
              </ol>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <Info className="h-10 w-10 text-primary mx-auto mb-4" />
              <CardTitle>3. Configure & Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Open `extension/popup.js` and ensure `API_BASE_URL` points to where this Next.js app is running (default: `http://localhost:9002`).</p>
              <p className="text-muted-foreground">Click the extension icon to use the tools!</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-12 bg-secondary/50 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Important Notes</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4">
          This extension is currently set up for local development. For production use, you would need to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground max-w-xl mx-auto text-left mb-6">
            <li>Update `API_BASE_URL` in `extension/popup.js` to your deployed app's URL.</li>
            <li>Update `host_permissions` in `extension/manifest.json` to match your production domain.</li>
            <li>Replace placeholder icons in `extension/icons/` with your actual icons.</li>
            <li>Package the `extension` folder contents into a ZIP file for submission to the Chrome Web Store (if desired).</li>
        </ul>
        <Button asChild>
            <Link href="/help">
              Need Help? Visit our Help Center
            </Link>
        </Button>
      </section>
    </div>
  );
}

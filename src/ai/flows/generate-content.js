/**
 * @fileOverview A content generation AI agent.
 *
 * - generateContent - A function that handles the content generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentInputSchema = z.object({
  prompt: z.string().describe('A short prompt or idea for generating content.'),
});

const GenerateContentOutputSchema = z.object({
  generatedContent: z.string().describe('The content generated from the prompt.'),
  progress: z.string().describe('A short summary of what has been generated')
});

export async function generateContent(input) {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: {schema: GenerateContentInputSchema},
  output: {schema: GenerateContentOutputSchema},
  prompt: `You are a content creation expert.
Generate content based on the following prompt:

Prompt: {{{prompt}}}

After generating the content, also provide a short summary of what you generated in the 'progress' field. For example: "Generated a blog post outline about AI." or "Created a short story based on the user's idea."`,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // The prompt now requests the progress field directly.
    // No need to manually set it here unless overriding is needed.
    // If the model fails to set it, we can add a fallback:
    if (!output?.progress) {
      output.progress = 'Generated content based on the user-provided prompt.';
    }
    return output;
  }
);

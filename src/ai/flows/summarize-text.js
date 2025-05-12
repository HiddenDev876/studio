'use server';

/**
 * @fileOverview Summarizes a given text.
 *
 * - summarizeText - A function that handles the text summarization process.
 * - SummarizeTextInputSchema - The Zod schema for the input.
 * - SummarizeTextOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SummarizeTextInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
});

export const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The summary of the text.'),
});

export async function summarizeText(input) {
  return summarizeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: {schema: SummarizeTextInputSchema},
  output: {schema: SummarizeTextOutputSchema},
  prompt: `Summarize the following text:\n\n{{text}}`,
});

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);

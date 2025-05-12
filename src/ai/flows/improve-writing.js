'use server';
/**
 * @fileOverview A text improvement AI agent.
 *
 * - improveWriting - A function that handles the text improvement process.
 * - ImproveWritingInputSchema - The Zod schema for the input.
 * - ImproveWritingOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ImproveWritingInputSchema = z.object({
  text: z.string().describe('The text to improve.'),
});

export const ImproveWritingOutputSchema = z.object({
  improvedText: z.string().describe('The improved text.'),
});

export async function improveWriting(input) {
  return improveWritingFlow(input);
}

const improveWritingPrompt = ai.definePrompt({
  name: 'improveWritingPrompt',
  input: {schema: ImproveWritingInputSchema},
  output: {schema: ImproveWritingOutputSchema},
  prompt: `Improve the following text:

{{{text}}}`,
});

const improveWritingFlow = ai.defineFlow(
  {
    name: 'improveWritingFlow',
    inputSchema: ImproveWritingInputSchema,
    outputSchema: ImproveWritingOutputSchema,
  },
  async input => {
    const {output} = await improveWritingPrompt(input);
    return output;
  }
);

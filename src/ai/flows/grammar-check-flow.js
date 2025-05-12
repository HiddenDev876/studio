
'use server';
/**
 * @fileOverview A grammar checking AI agent.
 *
 * - checkGrammar - A function that handles the grammar checking process.
 * - GrammarCheckInputSchema - The Zod schema for the input.
 * - GrammarCheckOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GrammarCheckInputSchema = z.object({
  text: z.string().describe('The text to check for grammar errors.'),
});

export const GrammarCheckOutputSchema = z.object({
  correctedText: z.string().describe('The text with grammar corrections applied, or the original text if no errors were found.'),
  // Optional: For more detailed feedback, an array of issues could be added.
  // issues: z.array(z.object({
  //   description: z.string().describe('Description of the grammar issue.'),
  //   suggestion: z.string().describe('Suggested correction.'),
  //   originalSegment: z.string().describe('The original text segment with the issue.')
  // })).optional().describe('A list of grammar issues found and their suggestions.')
});

export async function checkGrammar(input) {
  return grammarCheckFlow(input);
}

const grammarCheckPrompt = ai.definePrompt({
  name: 'grammarCheckPrompt',
  input: {schema: GrammarCheckInputSchema},
  output: {schema: GrammarCheckOutputSchema},
  prompt: `You are an expert grammar checker. Review the following text for any grammatical errors, spelling mistakes, punctuation issues, or awkward phrasing.
Provide the corrected version of the text. If the text is already grammatically correct and well-phrased, return the original text.

Focus solely on corrections. Do not add any commentary or explanation unless it's part of the corrected text itself (e.g. fixing a run-on sentence might involve rephrasing which could be seen as commentary but is part of the correction).

Input text:
{{{text}}}

Output the corrected text in the 'correctedText' field.`,
});

const grammarCheckFlow = ai.defineFlow(
  {
    name: 'grammarCheckFlow',
    inputSchema: GrammarCheckInputSchema,
    outputSchema: GrammarCheckOutputSchema,
  },
  async input => {
    const {output} = await grammarCheckPrompt(input);
    return output;
  }
);

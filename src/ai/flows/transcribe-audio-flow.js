
'use server';
/**
 * @fileOverview An AI agent for transcribing audio files to text in a specified language.
 *
 * - transcribeAudioFile - A function that handles the audio transcription process.
 * - TranscribeAudioInputSchema - The Zod schema for the input.
 * - TranscribeAudioOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const TranscribeAudioInputSchema = z.object({
  audioDataUri: z.string().describe("A data URI of the audio file (e.g., MP3) to transcribe. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  targetLanguage: z.enum(["English", "Hindi"]).describe('The target language for the transcription (English or Hindi).'),
});

export const TranscribeAudioOutputSchema = z.object({
  transcribedText: z.string().describe('The text transcribed from the audio in the specified language.'),
});

export async function transcribeAudioFile(input) {
  return transcribeAudioFlow(input);
}

const transcribeAudioPrompt = ai.definePrompt({
  name: 'transcribeAudioPrompt',
  input: {schema: TranscribeAudioInputSchema},
  output: {schema: TranscribeAudioOutputSchema},
  prompt: `Transcribe the following audio to text accurately in the {{targetLanguage}} language.
Audio: {{media url=audioDataUri}}
Provide the transcription in the 'transcribedText' field.`,
});

const transcribeAudioFlow = ai.defineFlow(
  {
    name: 'transcribeAudioFlow',
    inputSchema: TranscribeAudioInputSchema,
    outputSchema: TranscribeAudioOutputSchema,
  },
  async input => {
    const {output} = await transcribeAudioPrompt(input);
    return output;
  }
);

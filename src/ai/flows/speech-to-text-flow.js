
'use server';
/**
 * @fileOverview An AI agent for transcribing speech to text.
 *
 * - transcribeSpeech - A function that handles the speech transcription process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpeechToTextInputSchema = z.object({
  audioDataUri: z.string().describe("A data URI of the audio file to transcribe. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});

const SpeechToTextOutputSchema = z.object({
  transcribedText: z.string().describe('The text transcribed from the audio.'),
});

export async function transcribeSpeech(input) {
  return speechToTextFlow(input);
}

const speechToTextPrompt = ai.definePrompt({
  name: 'speechToTextPrompt',
  input: {schema: SpeechToTextInputSchema},
  output: {schema: SpeechToTextOutputSchema},
  prompt: `Transcribe the following audio to text accurately.
Audio: {{media url=audioDataUri}}
Provide the transcription in the 'transcribedText' field.`,
});

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async input => {
    const {output} = await speechToTextPrompt(input);
    return output;
  }
);

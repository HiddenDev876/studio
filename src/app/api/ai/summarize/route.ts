
import { NextRequest, NextResponse } from 'next/server';
import { summarizeText, SummarizeTextInput } from '@/ai/flows/summarize-text';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as SummarizeTextInput;

    if (!body.text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const result = await summarizeText(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (adjust for production)
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    console.error('Error in summarize API:', error);
    return NextResponse.json({ error: error.message || 'Failed to summarize text' }, { status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
     });
  }
}


// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

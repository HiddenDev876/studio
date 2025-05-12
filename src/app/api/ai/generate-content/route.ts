
import { NextRequest, NextResponse } from 'next/server';
import { generateContent, GenerateContentInput } from '@/ai/flows/generate-content';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GenerateContentInput;

    if (!body.prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await generateContent(body);
    return NextResponse.json(result, {
       headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (adjust for production)
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    console.error('Error in generate-content API:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500, 
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

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

const generateImage = async (
  prompt: string, 
  size: '1024x1024' | '1792x1024' | '1024x1792', 
  style: 'natural' | 'vivid', 
  quality: 'standard' | 'hd'
) => {
  
  const response = await openai.images.generate({
    n: 1,
    prompt,
    model: 'dall-e-3',
    size: size ?? '1024x1024', 
    style: style ?? 'natural', 
    quality: quality ?? 'standard',
    response_format: 'b64_json',
  });

  const image = response.data[0].b64_json;
  return { image: `data:image/png;base64, ${image}` };
}

export async function POST(req:any) {
  const { prompt, size, style, quality } = await req.json();

  const response = await generateImage(prompt, size, style, quality);

  return Response.json(response);
}
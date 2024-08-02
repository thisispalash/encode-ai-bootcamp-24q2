import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

let ASSISTANT: any;

const generateDescription = async (theme: string, prompt: string) => {

  // start new thread for each description
  const thread = await openai.beta.threads.create();

  // create a new message
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: 'user',
      content: `Theme: ${theme}, Prompt: ${prompt}`
    }
  );

  // send the message to the assistant
  let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: ASSISTANT.id,
      additional_instructions: 'If the prompt does not fit the theme, ask for a new prompt. If the prompt fits the theme, generate a description of a painting that fits the theme and prompt. Respond in json format with only one key, "description". The description should be an escaped string and returned as the value of the key, "description".',
      max_completion_tokens: 420,
      response_format: { type: 'json_object' }
    }
  );

  // get the last message in thread and return
  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id,
      { order: 'desc' }
    );
    const lastMessage = messages.data[0];
    // @ts-ignore
    const response = JSON.parse(lastMessage.content[0].text.value);
    return response;
  } else {
    console.log(run.status);
    return { description: 'Error occured in generating description. Please try again.' };
  }

}

const createAssistant = async () => {

  const assistant = await openai.beta.assistants.create({
    name: 'Painting Assistant',
    instructions: 'You are a paintings expert. Your user will provide you with a theme and a prompt. Generate a description of a painting that fits the theme and prompt. Only provide a description of the painting. Make sure to include the elements, style, details, and colors of the painting.',
    model: 'gpt-4o-mini',
  });

  ASSISTANT = assistant;
}

export async function GET(req: any) {
  await createAssistant();
  return Response.json({ message: 'Assistant created' });
}


export async function POST(req: any) {
  const { theme, prompt } = await req.json();

  if(!ASSISTANT) await createAssistant();
  const response = await generateDescription(theme, prompt);

  return Response.json(response);
}
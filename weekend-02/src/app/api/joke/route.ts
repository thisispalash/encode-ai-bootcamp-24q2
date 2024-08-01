import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

const CATEGORIES = [
  'One Liner',
  'Pun',
  'Dad Joke',
  'Knock Knock',
  'Anti Joke',
  'Dark Humor',
  'Light Humor',
  'Political',
  'Existential',
  'Yo Mama',
  'Unfunny',
]

const generateJoke = async (category: string, topic: string) => {
  const messages = [
    {
      role: 'system',
      content: 'You are a funny person!'
    },
    {
      role: 'system',
      content: 'You will be given a category and a topic to generate a joke.'
    },
    {
      role: 'system',
      content: 'Respond in json format with only one key, "joke".'
    },
    {
      role: 'system',
      content: 'The joke should be an escaped string and returned as the value of the key, "joke".'
    },
    {
      role: 'system',
      content: 'Make sure you return a joke in correct category about the topic provided.'
    },
    {
      role: 'system',
      content: 'If the category is not a pun, try to avoid puns in the joke.'
    },
    {
      role: 'system',
      content: `All categories that a user can select are: ${CATEGORIES.join(', ')}`
    },
    {
      role: 'user',
      content: `Catergory: ${category}, Topic: ${topic}`
    },
  ];

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
  });

  const data = JSON.parse(response.choices[0].message.content || '');
  return data.joke;
}

export async function GET() {
  return Response.json({ categories: CATEGORIES });
}

export async function POST(req: any) {
  const { category, topic } = await req.json();

  const joke = await generateJoke(category, topic);
  console.log(joke)

  return Response.json({ joke });
}
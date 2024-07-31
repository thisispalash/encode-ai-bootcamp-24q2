import os
from pick import pick
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

CLIENT = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')

PERSONALITY = {
  'Ranveer Brar': '''
  
  You are Ranveer Brar. A popular Indian chef, television host, and food stylist, you are known for your innovative take on traditional Indian cuisine. You have hosted several cooking shows and have a strong social media presence. You are passionate about preserving and promoting Indian culinary traditions while also experimenting with new flavors and techniques.
  
  ''',
  
  'Marco Pierre': '''
  
  You are Marco Pierre White. A renowned British chef and restaurateur, you are known for your classical British cooking style and your fiery temper. You were the youngest chef to be awarded three Michelin stars, and you have trained some of the best chefs in the world, including Gordon Ramsay. You are known for your no-nonsense approach to cooking and your high standards in the kitchen.
  
  '''
}


def select_personality():
  personas = list(PERSONALITY.keys())
  selected, _ = pick(personas, 'Please select a personality:', indicator='=>')
  return PERSONALITY[selected]


def get_task(prompt):
  messages = [
    { # objective
      'role': 'system',
      'content': 'You are a chef assistant. Your user will interact with you in three main ways, which are to suggest a dish, provide a recipe, or critique a dish. Respond with "suggest", "recipe", or "critique" based on the user input. If the user input does not fit any of these categories, respond with "unknown".'
    },
    { # suggest
      'role': 'system',
      'content': 'If the user provides one or more ingredients, respond with "suggest".'
    },
    { # recipe
      'role': 'system',
      'content': 'If the user provides the name of a dish, respond with "recipe".'
    },
    { # critique
      'role': 'system',
      'content': 'If the user provides a recipe or a description of a dish, respond with "critique".'
    },
    { # unknown
      'role': 'system',
      'content': 'If the user input does not fit any of the above categories, respond with "unknown".'
    },
    { # prompt
      'role': 'user',
      'content': prompt
    },
  ]
  
  res = CLIENT.chat.completions.create(
    model=MODEL,
    messages=messages
  )
  try:
    task = res.choices[0].message.content
    return task
  except:
    return 'unknown'


def stream_response(messages):
  stream = CLIENT.chat.completions.create(
    model=MODEL,
    messages=messages,
    stream=True
  )
  
  for chunk in stream:
    res = chunk.choices[0].delta.content
    if res: print(res, end="")
  
  print() # line break for neatness
  
  
def suggest(personality, prompt):
  print('\nThinking of a dish with the provided ingredients..\n')
  
  messages = [
    {
      'role': 'system',
      'content': personality
    },
    {
      'role': 'system',
      'content': 'Your task is to suggest a dish based on the ingredients provided by the user. Only provide the name of the dish as the response, do not provide a recipe.'
    },
    {
      'role': 'user',
      'content': prompt
    }
  ]
  
  stream_response(messages)


def recipe(personality, prompt):
  print('\nLooking up the recipe for your dish..\n')
  
  messages = [
    {
      'role': 'system',
      'content': personality
    },
    {
      'role': 'system',
      'content': 'Your task is to provide a recipe for the dish provided by the user. The recipe should include the ingredients and the cooking instructions.'
    },
    {
      'role': 'user',
      'content': prompt
    }
  ]
  
  stream_response(messages)


def critique(personality, prompt):
  print('\nAre you ready for me to critique your recipe?\n')
   
  messages = [
    {
      'role': 'system',
      'content': personality
    },
    {
      'role': 'system',
      'content': 'Your task is to critique the recipe provided by the user. You should provide constructive feedback on the recipe, including suggestions for improvement.'
    },
    {
      'role': 'user',
      'content': prompt
    }
  ]
  
  stream_response(messages)
 

def main():
  print('Welcome to ChefGPT!')
  personality = select_personality()
  is_first = True
  
  while True:
    
    if is_first: 
      prompt = input('\nHello there, I am ChefGPT.\nI can suggest a dish, provide a recipe, or critique a dish. What would you like me to do? (Type "exit" to quit.)\n')
      is_first = False
    else:
      prompt = input('\nWhat would you like me to do next? (Type "exit" to quit.)\n')
    
    if prompt == 'exit':
      print('Goodbye!')
      break
    
    task = get_task(prompt)
    if task == 'suggest':
      suggest(personality, prompt)
    elif task == 'recipe':
      recipe(personality, prompt)
    elif task == 'critique':
      critique(personality, prompt)
    else:
      print('I am sorry, I did not understand that. Please try again.')
      
if __name__ == '__main__':
  main()
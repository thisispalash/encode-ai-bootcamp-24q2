## ChefGPT
> [instructions](https://github.com/Encode-Club-AI-Bootcamp/Generative-AI-Applications/tree/main/Lesson-04#weekend-project)

This is the weekend project for the first week of Encode Club AI Bootcamp 2024q2. It demonstrates the use of OpenAI's API to create a chef assistant to suggest dishes, provide a recipe, or critique a recipe.

### Screen Recording

![screen-recording](./chefgpt-screen-recording.mov)

## Usage Instructions

> Getting OpenAI access
```sh
$ cp .env.example .env
# Create an API key on platform.openai.com
# See https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key
# Fill in the API Key in the appropriate slot
```

> Running the script
```sh
$ python3 -m venv .chefgpt
$ source .chefgpt/bin/activate
$ pip3 install -r requirements.txt
$ python3 main.py
```

## Examples

### Suggest a dish

```txt
Welcome to ChefGPT!

Hello there, I am ChefGPT.
I can suggest a dish, provide a recipe, or critique a dish. What would you like me to do? (Type "exit" to quit.)
I have some tomatoes and eggs. What can I do for breakfast?

Thinking of a dish with the provided ingredients..

Shakshuka

What would you like me to do next? (Type "exit" to quit.)
```

### Suggest a recipe

```txt
What would you like me to do next? (Type "exit" to quit.)
Shakshuka recipe pls

Looking up the recipe for your dish..

Absolutely! Shakshuka is a delightful dish, perfect for breakfast or brunch, and it's full of flavor. Here’s a simple recipe that you can try at home:

### Shakshuka Recipe

#### Ingredients:
- 2 tablespoons olive oil
- 1 onion, chopped
- 1 red bell pepper, chopped
- 3 cloves garlic, minced
- 1 teaspoon ground cumin
- 1 teaspoon smoked paprika (optional)
- 1 can (14 oz) crushed tomatoes (or 4-5 fresh tomatoes, chopped)
- 1 teaspoon sugar (to balance acidity)
- Salt and pepper, to taste
- 4-6 large eggs
- Fresh herbs (such as parsley or cilantro), chopped, for garnish
- Crumbled feta cheese (optional)
- Crusty bread, for serving

#### Instructions:

1. **Cook the Base**: In a large, deep skillet or frying pan, heat the olive oil over medium heat. Add the chopped onion and bell pepper. Sauté until the onion is translucent and the bell pepper is soft, about 5-7 minutes.

2. **Add Garlic and Spices**: Stir in the minced garlic, cumin, and smoked paprika, and cook for another 1-2 minutes until fragrant.

3. **Tomatoes**: Pour in the crushed tomatoes, and add the sugar, salt, and pepper. Stir well to combine. Simmer for about 10-15 minutes, allowing the mixture to thicken slightly. Taste and adjust seasoning as needed.

4. **Create Wells**: Once the sauce is thickened, use a spoon to create small wells in the sauce for the eggs.

5. **Crack in the Eggs**: Carefully crack the eggs into the wells, trying to keep the yolks intact. Cover the skillet and let it cook for about 6-8 minutes, or until the egg whites are set but the yolks are still runny. If you prefer your yolks more set, let them cook for a few more minutes.

6. **Garnish**: Once cooked, remove from heat and sprinkle fresh herbs and crumbled feta cheese on top.

7. **Serve**: Serve the shakshuka hot, straight from the skillet, with slices of crusty bread for dipping.

Enjoy this beautiful dish that’s not just a treat for your taste buds but also a feast for your eyes! You can always customize it by adding vegetables, beans, or even some spicy sausage if you like. Happy cooking!

What would you like me to do next? (Type "exit" to quit.)
```

### Critique a recipe

```txt
What would you like me to do next? (Type "exit" to quit.)
What do you think of this? Take two tomatoes and chop them. Add them to a pan on medium heat and let it become squishy. Add in eggs, careful not to break the yolks. Cover with lid to steam. Serve. 

Are you ready for me to critique your recipe?

I appreciate the simplicity of your recipe and the lovely idea of combining tomatoes and eggs – a classic and delightful pairing! Here are some suggestions for improvement to elevate the dish:

1. **Seasoning**: It would be great to add some seasoning to enhance the flavors. Consider adding salt, pepper, and perhaps some spices like cumin or turmeric while the tomatoes are cooking. Fresh herbs, like cilantro or parsley, would also add a lovely touch both in flavor and presentation.

2. **Aromatics**: Starting with some chopped onions or garlic can add depth to the dish. Sauté these aromatics before adding the tomatoes to build a flavorful base.

3. **Texture**: To create more texture, consider adding a pinch of chili flakes or diced green chili for a bit of heat. You could also incorporate some greens, like spinach, for added nutrition and color.

4. **Egg Preparation**: Instead of just adding eggs and steaming them, you could gently scramble them into the tomatoes, which would create a creamier consistency. If you prefer the eggs to remain whole, consider poaching them in the tomato mixture for a more rustic presentation.

5. **Optional Add-ins**: Adding a bit of cheese—like crumbled feta or grated parmesan—while the dish is still warm can give it a creamy richness. 

6. **Serving Suggestions**: Think about serving this dish with toasted bread or roti for a more complete meal. A sprinkle of fresh herbs or a drizzle of good olive oil before serving can elevate the presentation.

Overall, your concept has a solid foundation, and with these little tweaks, it could be elevated into a beautifully flavored and more robust dish. Happy cooking!

What would you like me to do next? (Type "exit" to quit.)
```

### Exiting

```txt
What would you like me to do next? (Type "exit" to quit.)
exit
Goodbye!
```
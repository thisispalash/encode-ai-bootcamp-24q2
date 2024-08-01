'use client';

import { useState, useEffect, useCallback } from 'react';
import Spinner from '@/components/Spinner';

export default function Home() {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ joke, setJoke ] = useState('');
  const [ categories, setCategories ] = useState([]);

  const getCategories = useCallback(async () => {
    const response = await fetch('/api/joke');
    const data = await response.json();
    setCategories(data.categories);
  }, []);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const category = e.target.category.value;
    const topic = e.target.topic.value;
    console.log(category, topic)
    const response = await fetch('/api/joke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category, topic })
    });
    const data = await response.json();
    if (data.joke) {
      setJoke(data.joke);
    } else {
      setJoke('Error generating joke, please try again!');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  return (
    <div className="container mx-auto h-screen p-8">

      {/* Header */}
      <div className="text-2xl top-0 p-8 text-center">
        <p>JokeGPT</p>
      </div>

      {/* Main */}
      <div className="container my-auto p-8 text-center">

        <p>Generate jokes using OpenAI</p>

        <form onSubmit={handleSubmit} className="p-2 w-4/5 mx-auto">

          <div className="flex">
            <select 
              name="category"
              className="p-2"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <div className="relative w-full">

              <input 
                name="topic" 
                type="text" 
                className="p-2 w-full" 
                maxLength={200} 
                placeholder="Joke Topic.. (eg, cats)" 
              />

              <button type="submit" disabled={isLoading} className="absolute right-0 top-0 p-2">
                Generate
              </button>

            </div>
            
          </div>

        </form>

      </div>

      <div className="p-8 text-center">
        {isLoading && <Spinner />}
        {joke && !isLoading && <p>{joke}</p>}
      </div>

    </div>
  );
}

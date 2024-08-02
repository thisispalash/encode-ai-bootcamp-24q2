'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Spinner from '@/components/Spinner';

const THEMES = [
  'Abstract',
  'Landscape',
  'Portrait',
  'Still Life',
  'Surrealism',
  'Impressionism',
  'Realism',
  'Rennaissance',
  'Baroque',
  'Pop Art',
]

export default function Home() {

  const [ theme, setTheme ] = useState(''); // theme of the painting
  const [ prompt, setPrompt ] = useState(''); // user description of the painting
  const [ description, setDescription ] = useState(''); // ai generated description of the painting
  const [ imageParams, setImageParams ] = useState({ size: '', style: '', quality: '' }); // parameters for generating the painting
  const [ isLoading, setIsLoading ] = useState(false); // used for getting painting description
  const [ isGenerating, setIsGenerating ] = useState(false); // used for generation of painting
  const [ aiResponded, setAiResponded ] = useState(false); // used to display final component
  const [ aiImage, setAiImage ] = useState(''); // generated painting

  const handleThemeChange = (e: any) => {
    setTheme(e.target.value);
  }

  const handlePrompt = (e: any) => {
    setPrompt(e.target.value);
  }

  const generateDescription = async () => {
    setDescription('');
    setIsLoading(true);
    setAiResponded(false);
    
    if(!theme) {
      setDescription('Please select a theme');
      setIsLoading(false);
      return;
    }

    if(!prompt) {
      setDescription('Please enter some description');
      setIsLoading(false);
      return;
    }
    console.log(theme, prompt);

    const response = await fetch('/api/describe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ theme, prompt })
    });
    const data = await response.json();

    setDescription(data.description);
    setIsLoading(false);
    setAiResponded(true);
  }

  const generateImage = async () => {
    setIsGenerating(true);
    console.log(imageParams);
    setIsGenerating(false);
  }

  useEffect(() => {
    fetch('/api/describe', { method: 'GET' });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      {/* Header */}
      <div className="text-2xl top-0 p-8 text-center">
        <p>Paintings FTW</p>
      </div>

      {/* Generate Description */}
      <div className="flex flex-col m-auto p-8 text-center items-center gap-4 w-full">

        <div className="flex flex-row justify-center w-full">

          <select 
            name="theme"
            disabled={isLoading || isGenerating}
            onChange={handleThemeChange}
            className="rounded-l-lg text-slate-900 bg-slate-100 p-2 w-1/6 border border-slate-300 cursor-pointer hover:bg-slate-200 focus:outline-none"
          >
            <option value="">Select a theme</option>
            {THEMES.map((theme, index) => (
              <option key={index} value={theme}>{theme}</option>
            ))}
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description of the painting.. (eg, a cat)"
            className="p-2 text-slate-900 bg-slate-100 focus:outline-none border border-slate-300 w-4/6"
            disabled={isLoading || isGenerating}
            onChange={handlePrompt}
          />

          <button
            type="submit"
            disabled={isLoading || isGenerating}
            onClick={generateDescription}
            className="p-2 w-1/6 bg-slate-900 text-slate-200 rounded-r-lg enabled:hover:bg-slate-700 focus:outline-none"
          >
            Generate Painting Idea
          </button>

        </div>

        {/* Painting Description (or message to user) */}
        <div className="p-8 m-auto text-justify w-full border border-slate-100 rounded-lg">
          {isLoading && <Spinner />}
          {description && <p>{description}</p>}
        </div>

        {/* Image Generation */}
        {aiResponded && (
          
          <div className="p-8 m-auto text-center w-full border border-slate-100 rounded-lg">

            <div className="flex flex-row justify-center w-full gap-6">

              <select
                name="imageSize"
                value={imageParams.size}
                disabled={isGenerating}
                onChange={(e) => setImageParams({...imageParams, size: e.target.value})}
                className="rounded-lg text-slate-900 bg-slate-100 p-2 w-1/6 border border-slate-300 cursor-pointer hover:bg-slate-200 focus:outline-none"
              >
                <option value="256">256 x 256</option>
                <option value="512">512 x 512</option>
                <option value="1024">1024 x 1024</option>
              </select>

              <select
                name="imageStyle"
                value={imageParams.style}
                disabled={isGenerating}
                onChange={(e) => setImageParams({...imageParams, style: e.target.value})}
                className="rounded-lg text-slate-900 bg-slate-100 p-2 w-1/6 border border-slate-300 cursor-pointer hover:bg-slate-200 focus:outline-none"
              >
                <option value="natural">Natural</option>
                <option value="vivid">Vivid</option>
                <option value="pastel">Pastel</option>
              </select>

              <select
                name="imageQuality"
                value={imageParams.quality}
                disabled={isGenerating}
                onChange={(e) => setImageParams({...imageParams, quality: e.target.value})}
                className="rounded-lg text-slate-900 bg-slate-100 p-2 w-1/6 border border-slate-300 cursor-pointer hover:bg-slate-200 focus:outline-none"
              >
                <option value="sd">Standard</option>
                <option value="hd">High Definition</option>
              </select>

              <button
                type="submit"
                disabled={isGenerating || isLoading}
                onClick={generateImage}
                className="p-2 w-1/6 bg-slate-900 text-slate-200 rounded-lg hover:bg-slate-700 focus:outline-none"
              >
                Generate Image
              </button>
            </div>

            <div className="p-8 m-auto w-full">
              {isGenerating && <Spinner />}
              {aiImage && <Image src={aiImage} alt="Generated Painting" />}
            </div>

          </div>

        )}

      </div>

    </main>
  );
}

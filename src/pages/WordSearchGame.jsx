import React, { useState, useEffect } from 'react';
import AdverticaAd from '../components/AdverticaAd';

const WordSearchGame = () => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foundWords, setFoundWords] = useState([]);

  // A simple static grid generation for demonstration since LLMs might struggle to return perfect 2D grids reliably.
  // We'll ask the LLM just for historical words, and build the grid in JS.
  const fetchWords = async () => {
    setLoading(true);
    setFoundWords([]);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: "You are a historian. Provide a list of 5 Latin or ancient Greek terms related to history or philosophy (max 8 letters each). Return a JSON object with 'words' as an array of strings. No markdown format.",
          prompt: "Generate historical words for a word search in JSON."
        })
      });
      const textData = await response.json();
      let data = textData.choices[0].message.content;
      data = data.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(data);
      const wordList = parsedData.words.map(w => w.toUpperCase().replace(/[^A-Z]/g, ''));
      setWords(wordList);
      generateGrid(wordList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateGrid = (wordList) => {
    const size = 10;
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
    
    // Very basic placement (horizontal only for demo)
    wordList.forEach((word, index) => {
      const row = index * 2;
      const col = Math.floor(Math.random() * (size - word.length + 1));
      for(let i=0; i<word.length; i++) {
        newGrid[row][col+i] = word[i];
      }
    });

    // Fill the rest
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let r=0; r<size; r++) {
      for(let c=0; c<size; c++) {
        if(newGrid[r][c] === '') {
          newGrid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const toggleWord = (word) => {
    if (foundWords.includes(word)) return;
    setFoundWords([...foundWords, word]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Lexicon Search</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 card">
          {loading ? (
            <div className="h-64 flex items-center justify-center italic text-ink-500">Scribing the parchment...</div>
          ) : (
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' }}>
              {grid.map((row, rIdx) => 
                row.map((cell, cIdx) => (
                  <div key={`${rIdx}-${cIdx}`} className="aspect-square bg-parchment-200 border border-parchment-400 flex items-center justify-center font-mono text-xl font-bold text-ink-800 hover:bg-parchment-500 cursor-pointer transition-colors">
                    {cell}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        <div className="card">
          <h3 className="text-2xl font-bold mb-4 border-b border-parchment-500 pb-2">Ancient Terms</h3>
          {loading ? (
            <div className="italic text-ink-500">Waiting for terms...</div>
          ) : (
            <ul className="space-y-3">
              {words.map((word, idx) => (
                <li key={idx} 
                    className={`flex items-center justify-between p-2 rounded cursor-pointer border ${foundWords.includes(word) ? 'bg-parchment-500 text-parchment-100 line-through border-ink-800' : 'bg-parchment-200 border-parchment-400 hover:bg-parchment-300'}`}
                    onClick={() => toggleWord(word)}>
                  <span className="font-mono font-bold tracking-widest">{word}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-8 pt-4 border-t border-parchment-400">
            <button onClick={fetchWords} className="btn-secondary w-full">New Lexicon</button>
            <p className="text-xs text-ink-500 mt-2 italic text-center">Click a word when found in the grid.</p>
          </div>
        </div>
      </div>

      <AdverticaAd slotId="wordsearch-bottom" />
    </div>
  );
};

export default WordSearchGame;

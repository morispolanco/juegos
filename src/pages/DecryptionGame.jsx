import React, { useState, useEffect } from 'react';
import AdverticaAd from '../components/AdverticaAd';

const DecryptionGame = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const fetchPuzzle = async () => {
    setLoading(true);
    setMessage('');
    setGuess('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: "You are an ancient cryptographer. Provide a short historical quote encrypted with a Caesar cipher (shift of your choice). Return a JSON object with 'encryptedQuote', 'author', 'hint', and 'solution'. No markdown format.",
          prompt: "Generate a new cryptography puzzle in JSON format."
        })
      });
      const textData = await response.json();
      let data = textData.choices[0].message.content;
      data = data.replace(/```json/g, '').replace(/```/g, '').trim();
      setPuzzle(JSON.parse(data));
    } catch (error) {
      console.error(error);
      setMessage("The ancient scripts are currently unreadable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!puzzle) return;
    if (guess.toLowerCase().trim() === puzzle.solution.toLowerCase().trim()) {
      setMessage('Correct! The ancient secrets are revealed.');
    } else {
      setMessage('Incorrect. The codex remains sealed.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Manuscript Decryption</h1>
      
      <div className="card mb-8">
        {loading ? (
          <div className="text-center py-12 italic text-ink-500">Deciphering ancient texts...</div>
        ) : puzzle ? (
          <div>
            <div className="bg-parchment-300 p-6 rounded-md border border-parchment-500 mb-6 font-mono text-xl tracking-wider text-center text-ink-900 shadow-inner">
              {puzzle.encryptedQuote}
            </div>
            
            <p className="mb-4 italic text-ink-800">Hint: {puzzle.hint}</p>
            
            <form onSubmit={handleGuess} className="flex flex-col gap-4">
              <textarea 
                className="w-full p-4 bg-parchment-100 border-2 border-parchment-400 rounded-md font-serif text-lg focus:outline-none focus:border-ink-800 resize-none h-32"
                placeholder="Enter the deciphered text here..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">Reveal Truth</button>
                <button type="button" onClick={fetchPuzzle} className="btn-secondary">New Scroll</button>
              </div>
            </form>
            
            {message && (
              <div className={`mt-6 p-4 rounded-md font-bold text-center ${message.includes('Correct') ? 'bg-[#d1e7dd] text-[#0f5132]' : 'bg-[#f8d7da] text-[#842029]'}`}>
                {message}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <AdverticaAd slotId="decryption-middle" />
    </div>
  );
};

export default DecryptionGame;

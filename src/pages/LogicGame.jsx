import React, { useState, useEffect } from 'react';
import AdverticaAd from '../components/AdverticaAd';

const LogicGame = () => {
  const [riddle, setRiddle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const fetchRiddle = async () => {
    setLoading(true);
    setMessage('');
    setGuess('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: "You are a sphinx from antiquity. Provide a classic historical logic riddle. Return a JSON object with 'riddle', 'hint', and 'solution' (a single word or short phrase). No markdown format.",
          prompt: "Generate a new logic riddle in JSON format."
        })
      });
      const textData = await response.json();
      let data = textData.choices[0].message.content;
      data = data.replace(/```json/g, '').replace(/```/g, '').trim();
      setRiddle(JSON.parse(data));
    } catch (error) {
      console.error(error);
      setMessage("The Oracle is currently silent.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!riddle) return;
    
    // Simple verification (in a real app, AI could check semantics)
    if (guess.toLowerCase().includes(riddle.solution.toLowerCase()) || riddle.solution.toLowerCase().includes(guess.toLowerCase())) {
      setMessage(`Correct! The answer is indeed: ${riddle.solution}`);
    } else {
      setMessage('Incorrect. The sphinx glares at you.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Philosopher's Logic</h1>
      
      <div className="card mb-8">
        {loading ? (
          <div className="text-center py-12 italic text-ink-500">Consulting the Oracle...</div>
        ) : riddle ? (
          <div>
            <div className="bg-parchment-200 p-8 rounded-md border-l-4 border-parchment-600 mb-6 font-serif text-2xl leading-relaxed text-ink-900 shadow-md italic">
              "{riddle.riddle}"
            </div>
            
            <p className="mb-6 text-ink-800 border border-parchment-400 inline-block px-4 py-2 bg-parchment-300 rounded">
              <span className="font-bold">Hint:</span> {riddle.hint}
            </p>
            
            <form onSubmit={handleGuess} className="flex gap-4">
              <input 
                type="text"
                className="flex-grow p-4 bg-parchment-100 border-2 border-parchment-400 rounded-md font-serif text-xl focus:outline-none focus:border-ink-800"
                placeholder="Speak your answer..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button type="submit" className="btn-primary">Answer</button>
            </form>
            
            {message && (
              <div className={`mt-6 p-4 rounded-md font-bold text-center text-lg ${message.includes('Correct') ? 'bg-[#d1e7dd] text-[#0f5132] border border-[#badbcc]' : 'bg-[#f8d7da] text-[#842029] border border-[#f5c2c7]'}`}>
                {message}
              </div>
            )}
            
            <div className="mt-8 text-center border-t border-parchment-300 pt-6">
              <button onClick={fetchRiddle} className="btn-secondary">Ask Another Question</button>
            </div>
          </div>
        ) : null}
      </div>

      <AdverticaAd slotId="logic-middle" />
    </div>
  );
};

export default LogicGame;

import React from 'react';
import { Link } from 'react-router-dom';
import { Key, Brain, Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-ink-900 border-b-2 border-parchment-500 pb-4 inline-block">
        Welcome to the Grand Library
      </h1>
      <p className="text-xl max-w-2xl text-ink-800 mb-12 italic font-serif leading-relaxed">
        Delve into the annals of history and challenge your intellect with puzzles that have confounded scholars for centuries. Choose your path of enlightenment below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Link to="/decryption" className="card group hover:-translate-y-2 transition-transform duration-300">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-parchment-300 flex items-center justify-center mb-4 text-ink-800 group-hover:bg-ink-800 group-hover:text-parchment-200 transition-colors">
              <Key size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Decryption</h2>
            <p className="text-ink-500 font-sans text-sm">Translate ancient ciphers and reveal hidden historical secrets.</p>
          </div>
        </Link>

        <Link to="/logic" className="card group hover:-translate-y-2 transition-transform duration-300">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-parchment-300 flex items-center justify-center mb-4 text-ink-800 group-hover:bg-ink-800 group-hover:text-parchment-200 transition-colors">
              <Brain size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Logic Riddles</h2>
            <p className="text-ink-500 font-sans text-sm">Outsmart the ancient philosophers with mind-bending logic puzzles.</p>
          </div>
        </Link>

        <Link to="/wordsearch" className="card group hover:-translate-y-2 transition-transform duration-300">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-parchment-300 flex items-center justify-center mb-4 text-ink-800 group-hover:bg-ink-800 group-hover:text-parchment-200 transition-colors">
              <Search size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Word Search</h2>
            <p className="text-ink-500 font-sans text-sm">Hunt for forgotten Latin and historical terms in a sea of letters.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Scroll, Key, Brain, Search } from 'lucide-react';
import Home from './pages/Home';
import DecryptionGame from './pages/DecryptionGame';
import LogicGame from './pages/LogicGame';
import WordSearchGame from './pages/WordSearchGame';
import AdverticaAd from './components/AdverticaAd';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <header className="bg-ink-900 text-parchment-200 py-6 px-4 shadow-xl border-b-4 border-parchment-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-30 mix-blend-multiply"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
            <Link to="/" className="text-3xl md:text-4xl font-serif font-bold tracking-wider flex items-center gap-3 mb-4 md:mb-0">
              <Scroll size={36} className="text-parchment-400" />
              <span>Archaic Enigmas</span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8 font-serif text-lg">
              <Link to="/decryption" className="hover:text-parchment-400 transition-colors flex items-center gap-2"><Key size={20}/> Decryption</Link>
              <Link to="/logic" className="hover:text-parchment-400 transition-colors flex items-center gap-2"><Brain size={20}/> Logic</Link>
              <Link to="/wordsearch" className="hover:text-parchment-400 transition-colors flex items-center gap-2"><Search size={20}/> Word Search</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 relative">
          <div className="absolute left-0 top-0 w-8 h-full bg-parchment-400/20 border-r border-parchment-400 hidden md:block"></div>
          <div className="absolute right-0 top-0 w-8 h-full bg-parchment-400/20 border-l border-parchment-400 hidden md:block"></div>
          <div className="md:px-12">
            <AdverticaAd slotId="header-top" height="90px" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/decryption" element={<DecryptionGame />} />
              <Route path="/logic" element={<LogicGame />} />
              <Route path="/wordsearch" element={<WordSearchGame />} />
            </Routes>
            <AdverticaAd slotId="footer-bottom" height="90px" />
          </div>
        </main>

        <footer className="bg-ink-900 text-parchment-400 py-6 text-center font-serif text-sm border-t border-parchment-600">
          <p>© {new Date().getFullYear()} Archaic Enigmas. A collection of historical puzzles.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

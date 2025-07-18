'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button 
        className="text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-90 translate-y-0' : '-translate-y-1'}`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-90 -translate-y-0' : 'translate-y-1'}`}></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-8 space-y-6">
          <a href="#" className="block text-lg text-white/80 hover:text-white transition-colors duration-300 uppercase tracking-wide">Work</a>
          <a href="#" className="block text-lg text-white/80 hover:text-white transition-colors duration-300 uppercase tracking-wide">About</a>
          <a href="#" className="block text-lg text-white/80 hover:text-white transition-colors duration-300 uppercase tracking-wide">Contact</a>
          
          <div className="pt-4 border-t border-white/10">
            <button className="w-full border border-white/30 text-white py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300">
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
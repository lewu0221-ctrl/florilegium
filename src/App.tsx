/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOGRAPHY_WORKS, CONTACT_INFO } from './constants';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import { PhotographyWork } from './types';

type Tab = 'works' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('works');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedWork, setSelectedWork] = useState<PhotographyWork | null>(null);

  const categories = ['All', ...Array.from(new Set(PHOTOGRAPHY_WORKS.map(w => w.category)))];

  const filteredWorks = activeCategory === 'All' 
    ? PHOTOGRAPHY_WORKS 
    : PHOTOGRAPHY_WORKS.filter(w => w.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col font-sans px-6 md:px-12 lg:px-24">
      {/* Header / Navigation */}
      <header className="py-12 md:py-16 flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xl font-medium tracking-tighter uppercase mb-1">Lumina</h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
            Visionary Photography / Kyoto
          </p>
        </motion.div>

        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('works')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              activeTab === 'works' ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
            id="nav-works"
          >
            Works
            {activeTab === 'works' && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-black"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              activeTab === 'contact' ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
            id="nav-contact"
          >
            Contact
            {activeTab === 'contact' && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-black"
              />
            )}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-12 md:pt-16">
        <AnimatePresence mode="wait">
          {activeTab === 'works' ? (
            <motion.div
              key="works"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Filter */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 border-b border-gray-50 pb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-[10px] uppercase tracking-widest transition-all ${
                      activeCategory === cat ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {cat}
                    <span className="ml-1 opacity-40">
                      ({cat === 'All' ? PHOTOGRAPHY_WORKS.length : PHOTOGRAPHY_WORKS.filter(w => w.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
              
              <Gallery works={filteredWorks} onSelect={setSelectedWork} />
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Contact info={CONTACT_INFO} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">
          Fine Art Photography Portfolio
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">
          Last Updated April 2024
        </p>
      </footer>

      {/* Lightbox Modal */}
      <Lightbox 
        work={selectedWork} 
        onClose={() => setSelectedWork(null)} 
      />
    </div>
  );
}

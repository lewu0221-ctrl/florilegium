/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOGRAPHY_GROUPS, CONTACT_INFO } from './constants';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import { PhotographyGroup } from './types';
import { ArrowLeft } from 'lucide-react';

type ViewState = 'WORKS' | 'GROUP_DETAIL' | 'CONTACT';

export default function App() {
  const [activeTab, setActiveTab] = useState<'works' | 'contact'>('works');
  const [currentView, setCurrentView] = useState<ViewState>('WORKS');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGroup, setSelectedGroup] = useState<PhotographyGroup | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(PHOTOGRAPHY_GROUPS.map(g => g.category)))];

  const filteredGroups = activeCategory === 'All'
    ? PHOTOGRAPHY_GROUPS
    : PHOTOGRAPHY_GROUPS.filter(g => g.category === activeCategory);

  const handleGroupSelect = (group: PhotographyGroup) => {
    setSelectedGroup(group);
    setCurrentView('GROUP_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBackToGroups = () => {
    setCurrentView('WORKS');
    setSelectedGroup(null);
  };

  const handleTabChange = (tab: 'works' | 'contact') => {
    setActiveTab(tab);
    setCurrentView(tab === 'works' ? 'WORKS' : 'CONTACT');
    setSelectedGroup(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans px-4 md:px-8 xl:px-12">
      {/* Header / Navigation */}
      <header className="py-12 md:py-16 flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="cursor-pointer"
          onClick={() => handleTabChange('works')}
        >
          <h1 className="text-xl font-medium tracking-tighter uppercase mb-1">Lumina</h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
            Visionary Photography / Kyoto
          </p>
        </motion.div>

        <nav className="flex gap-8">
          <button
            onClick={() => handleTabChange('works')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              activeTab === 'works' ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
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
            onClick={() => handleTabChange('contact')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              activeTab === 'contact' ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
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
      <main className="flex-1 pt-12">
        <AnimatePresence mode="wait">
          {currentView === 'WORKS' && (
            <motion.div
              key="works-view"
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
                      ({cat === 'All' ? PHOTOGRAPHY_GROUPS.length : PHOTOGRAPHY_GROUPS.filter(g => g.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>

              <Gallery
                key={`works-${activeCategory}`}
                items={filteredGroups.map(g => ({
                  id: g.id,
                  title: g.title,
                  category: g.category,
                  imageUrl: g.coverImageUrl || g.images[0] || '' // Fallback to first image if cover is missing
                }))}
                onSelect={(id) => handleGroupSelect(PHOTOGRAPHY_GROUPS.find(g => g.id === id)!)}
              />
            </motion.div>
          )}

          {currentView === 'GROUP_DETAIL' && selectedGroup && (
            <motion.div
              key="group-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <button
                  onClick={handleBackToGroups}
                  className="flex items-center text-[10px] uppercase font-mono tracking-widest text-gray-500 hover:text-black transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to {activeCategory}
                </button>
                <div className="max-w-2xl">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                    {selectedGroup.category} / {selectedGroup.year}
                  </span>
                  <h2 className="text-4xl font-light tracking-tight mb-4">{selectedGroup.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{selectedGroup.description}</p>
                </div>
              </div>

              <Gallery
                key={`detail-${selectedGroup.id}`}
                items={selectedGroup.images.map((img, idx) => ({
                  id: `${selectedGroup.id}-img-${idx}`,
                  title: `Sequence ${idx + 1}`,
                  category: selectedGroup.title,
                  imageUrl: img
                }))}
                onSelect={(id) => {
                  const idx = parseInt(id.split('-img-')[1]);
                  setSelectedImage(selectedGroup.images[idx]);
                }}
              />
            </motion.div>
          )}

          {currentView === 'CONTACT' && (
            <motion.div
              key="contact-view"
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

      {/* Basic Lightbox for single images */}
      <Lightbox
        work={selectedImage ? {
          id: 'temp',
          title: selectedGroup?.title || '',
          category: selectedGroup?.category || '',
          imageUrl: selectedImage,
          description: selectedGroup?.description || '',
          year: selectedGroup?.year || ''
        } : null}
        onClose={() => setSelectedImage(null)}
      />

      <footer className="py-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">
          Fine Art Photography Portfolio
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">
          Last Updated April 2024
        </p>
      </footer>
    </div>
  );
}

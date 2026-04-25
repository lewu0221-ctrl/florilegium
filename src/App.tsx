/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOGRAPHY_GROUPS, CONTACT_INFO } from './constants';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import { PhotographyGroup } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/works');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PHOTOGRAPHY_GROUPS.map(g => g.category)))];

  // Sync state with hash change
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/works');
      setSelectedImage(null); // Close lightbox on navigation
      window.scrollTo(0, 0); // Always scroll to top on navigation
    };
    window.addEventListener('hashchange', handleHashChange);

    // Initial check
    if (!window.location.hash) {
      window.location.hash = '#/works';
    } else {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Routing logic
  const isContact = currentHash === '#/contact';
  const isDetail = currentHash.startsWith('#/works/');
  const selectedGroupId = isDetail ? currentHash.replace('#/works/', '') : null;
  const selectedGroup = PHOTOGRAPHY_GROUPS.find(g => g.id === selectedGroupId) || null;
  const currentView = isContact ? 'CONTACT' : (isDetail && selectedGroup ? 'GROUP_DETAIL' : 'WORKS');

  // New logic: Auto-open lightbox if detail view has only one image
  useEffect(() => {
    if (currentView === 'GROUP_DETAIL' && selectedGroup && selectedGroup.images.length === 1) {
      setSelectedImage(selectedGroup.images[0]);
    }
  }, [currentView, selectedGroup]);

  const filteredGroups = activeCategory === 'All'
    ? PHOTOGRAPHY_GROUPS
    : PHOTOGRAPHY_GROUPS.filter(g => g.category === activeCategory);

  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  const handleGroupSelect = (group: PhotographyGroup) => {
    navigate(`#/works/${group.id}`);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    // If we were in a single-image group detail, going back should take us to the main works list
    if (selectedGroup && selectedGroup.images.length === 1) {
      navigate('#/works');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans px-4 md:px-8 xl:px-12">
      {/* Header / Navigation */}
      <header className="py-12 md:py-16 flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-gray-50">
        <div
          className="cursor-pointer"
          onClick={() => navigate('#/works')}
        >
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
        </div>

        <nav className="flex gap-8">
          <button
            onClick={() => navigate('#/works')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              (currentView === 'WORKS' || currentView === 'GROUP_DETAIL') ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
          >
            Works
            {(currentView === 'WORKS' || currentView === 'GROUP_DETAIL') && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-black"
              />
            )}
          </button>
          <button
            onClick={() => navigate('#/contact')}
            className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 transition-colors ${
              currentView === 'CONTACT' ? 'text-black' : 'text-gray-300 hover:text-gray-500'
            }`}
          >
            Contact
            {currentView === 'CONTACT' && (
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
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 border-b border-gray-50 pb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-[10px] uppercase tracking-widest transition-all ${
                      activeCategory === cat ? 'text-black font-bold border-b border-black' : 'text-gray-300 hover:text-gray-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <Gallery
                items={filteredGroups.map(g => ({
                  id: g.id,
                  title: g.title,
                  category: g.category,
                  imageUrl: g.coverImageUrl || g.images[0] || ''
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
                  onClick={() => window.history.back()}
                  className="flex items-center text-[10px] uppercase font-mono tracking-widest text-gray-500 hover:text-black transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Works
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

      <Lightbox
        work={selectedImage ? {
          id: 'temp',
          title: selectedGroup?.title || '',
          category: selectedGroup?.category || '',
          imageUrl: selectedImage,
          description: selectedGroup?.description || '',
          year: selectedGroup?.year || ''
        } : null}
        onClose={handleCloseLightbox}
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

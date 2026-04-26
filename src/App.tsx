/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOGRAPHY_GROUPS, CONTACT_INFO, NAV_MENU } from './constants';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import { PhotographyGroup, CategoryMenu } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/works');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // State derived from URL
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  const handleFilterSelect = (cat: string, sub: string | null = null, tag: string | null = null) => {
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('c', cat);
    if (sub) params.set('s', sub);
    if (tag) params.set('t', tag);

    const query = params.toString();
    const targetHash = `#/works${query ? `?${query}` : ''}`;
    navigate(targetHash);
  };

  const categories = ['All', ...NAV_MENU.map(m => m.name)];

  // Parse filters and route from hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/works';
      setCurrentHash(hash);
      setSelectedImage(null);

      const [hPath, hQuery] = hash.split('?');
      const urlParams = new URLSearchParams(hQuery || '');

      setActiveCategory(urlParams.get('c') || 'All');
      setActiveSubCategory(urlParams.get('s'));
      setActiveTag(urlParams.get('t'));

      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial sync

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simplified view detection
  const [pathPart] = currentHash.split('?');
  const isContact = pathPart === '#/contact';
  const isDetail = pathPart.startsWith('#/works/') && pathPart !== '#/works';

  const selectedGroupId = isDetail ? pathPart.replace('#/works/', '') : null;
  const selectedGroup = PHOTOGRAPHY_GROUPS.find(g => g.id === selectedGroupId) || null;

  const currentView = isContact ? 'CONTACT' : (isDetail && selectedGroup ? 'GROUP_DETAIL' : 'WORKS');

  // Filtering refined
  const filteredGroups = PHOTOGRAPHY_GROUPS.filter(g => {
    // 1. Primary Category matches
    if (activeCategory !== 'All' && g.category !== activeCategory) return false;

    // 2. Sub-category matches (if selected)
    if (activeSubCategory && g.subCategory !== activeSubCategory) return false;

    // 3. Tag matches (if selected)
    if (activeTag && !(g.tags || []).includes(activeTag)) return false;

    return true;
  });

  const handleGroupSelect = (group: PhotographyGroup) => {
    navigate(`#/works/${group.id}`);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    if (selectedGroup && selectedGroup.images.length === 1) {
      navigate('#/works');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans px-4 md:px-8 xl:px-12">
      {/* Header */}
      <header className="py-8 md:py-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-gray-50">
        <div className="cursor-pointer" onClick={() => { handleFilterSelect('All'); navigate('#/works'); }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-xl font-medium tracking-tighter uppercase mb-1">Lumina</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">Visionary Photography / Kyoto</p>
          </motion.div>
        </div>
        <nav className="flex gap-8">
          <button onClick={() => navigate('#/works')} className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 ${(currentView === 'WORKS' || currentView === 'GROUP_DETAIL') ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>
            Works
            {(currentView === 'WORKS' || currentView === 'GROUP_DETAIL') && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-black" />}
          </button>
          <button onClick={() => navigate('#/contact')} className={`font-mono text-[11px] uppercase tracking-widest relative pb-1 ${currentView === 'CONTACT' ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>
            Contact
            {currentView === 'CONTACT' && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-black" />}
          </button>
        </nav>
      </header>

      <main className="flex-1 pt-8">
        <AnimatePresence mode="wait">
          {currentView === 'WORKS' && (
            <motion.div key="works" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Refined Navigation Bar with Hover Dropdowns */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-12 border-b border-gray-50 pb-8 items-center">
                {categories.map((catName) => {
                  const menuObj = NAV_MENU.find(m => m.name === catName);

                  return (
                    <div key={catName} className="group relative py-2">
                      <button
                        onClick={() => handleFilterSelect(catName)}
                        className={`font-mono text-[10px] uppercase tracking-widest transition-all ${activeCategory === catName ? 'text-black font-bold underline underline-offset-8' : 'text-gray-300 hover:text-gray-500'}`}
                      >
                        {catName}
                      </button>

                      {menuObj && menuObj.subCategories && menuObj.subCategories.length > 0 && (
                        <div className="absolute top-full left-0 pt-4 opacity-0 scale-95 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                          <div className="bg-white/98 backdrop-blur-md border border-gray-100 shadow-2xl p-6 min-w-[240px] flex flex-col gap-6">
                            {menuObj.subCategories.map((sub) => (
                              <div key={sub.name} className="flex flex-col gap-3">
                                <button
                                  onClick={() => handleFilterSelect(catName, sub.name)}
                                  className={`text-left font-mono text-[10px] uppercase tracking-widest border-l-2 pl-4 ${activeSubCategory === sub.name ? 'text-black border-black font-bold' : 'text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200'}`}
                                >
                                  {sub.name}
                                </button>
                                {sub.tags && sub.tags.length > 0 && (
                                  <div className="flex flex-col pl-7 gap-2.5 border-l border-gray-50">
                                    {sub.tags.map(tag => (
                                      <button key={tag} onClick={() => handleFilterSelect(catName, sub.name, tag)} className={`text-left font-mono text-[9px] uppercase tracking-wider ${activeTag === tag ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'}`}>
                                        • {tag}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Active Filter Status */}
                {(activeSubCategory || activeTag) && (
                  <div className="ml-auto flex items-center gap-4 py-2">
                    <span className="font-mono text-[9px] text-gray-300 uppercase tracking-widest">
                      Filter <span className="text-gray-400 mx-1">/</span> {activeCategory} {activeSubCategory && `/ ${activeSubCategory}`} {activeTag && `/ ${activeTag}`}
                    </span>
                    <button onClick={() => handleFilterSelect('All')} className="font-mono text-[9px] text-black hover:text-gray-400 underline underline-offset-4 uppercase tracking-widest transition-colors">Clear All</button>
                  </div>
                )}
              </div>

              <Gallery
                layout="masonry"
                items={filteredGroups.map(g => ({ id: g.id, title: g.title, category: g.category, imageUrl: g.imageUrl || g.images[0] || '' }))}
                onSelect={(id) => handleGroupSelect(PHOTOGRAPHY_GROUPS.find(g => g.id === id)!)}
              />
            </motion.div>
          )}

          {currentView === 'GROUP_DETAIL' && selectedGroup && (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-12">
                <button onClick={() => navigate('#/works')} className="flex items-center text-[10px] uppercase font-mono tracking-widest text-gray-500 hover:text-black transition-colors mb-8 group">
                  <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Works
                </button>
                <div className="max-w-2xl">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 block">{selectedGroup.category} / {selectedGroup.year}</span>
                  <h2 className="text-4xl font-light tracking-tight mb-4">{selectedGroup.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{selectedGroup.description}</p>
                </div>
              </div>
              <Gallery items={selectedGroup.images.map((img, idx) => ({ id: `${selectedGroup.id}-${idx}`, title: `Photo ${idx + 1}`, category: selectedGroup.title, imageUrl: img }))} onSelect={(id) => { const idx = parseInt(id.split('-').pop()!); setSelectedImage(selectedGroup.images[idx]); }} />
            </motion.div>
          )}

          {currentView === 'CONTACT' && <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Contact info={CONTACT_INFO} /></motion.div>}
        </AnimatePresence>
      </main>

      <Lightbox
        work={selectedImage ? { id: 'lightbox', title: selectedGroup?.title || '', category: selectedGroup?.category || '', imageUrl: selectedImage, description: selectedGroup?.description || '', year: selectedGroup?.year || '' } : null}
        onClose={handleCloseLightbox}
      />

      <footer className="py-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 mt-12">
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">Fine Art Photography Portfolio</p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-300">© 2024 Lumina Vision</p>
      </footer>
    </div>
  );
}

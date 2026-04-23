/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { PhotographyWork } from '../types';

interface GalleryProps {
  works: PhotographyWork[];
  onSelect: (work: PhotographyWork) => void;
}

export default function Gallery({ works, onSelect }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-24">
      <AnimatePresence mode="popLayout">
        {works.map((work, index) => (
          <motion.div
            layout
            key={work.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: 0.4 }
            }}
            className="group cursor-pointer"
            onClick={() => onSelect(work)}
            id={`gallery-item-${work.id}`}
          >
          <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
            <img
              src={work.imageUrl}
              alt={work.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-sans text-sm font-medium tracking-tight text-gray-900 group-hover:text-black transition-colors">
              {work.title}
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              {work.category}
            </span>
          </div>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
}

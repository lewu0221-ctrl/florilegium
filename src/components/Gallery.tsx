/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface GalleryProps {
  items: GalleryItem[];
  onSelect: (id: string) => void;
  key?: string; // Add this to satisfy strict TS checks on the component itself
}

export default function Gallery({ items, onSelect }: GalleryProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 md:gap-10 pb-24 space-y-6 md:space-y-10">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: 0.4 }
            }}
            className="group cursor-pointer break-inside-avoid inline-block w-full"
            onClick={() => onSelect(item.id)}
            id={`gallery-item-${item.id}`}
          >
            <div className="relative overflow-hidden bg-gray-50 rounded-sm mb-5 transition-shadow hover:shadow-xl">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto block group-hover:scale-105 transition-all duration-1000 ease-in-out"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-baseline px-1">
              <h3 className="font-sans text-[13px] font-medium tracking-tight text-gray-900 group-hover:text-black transition-colors uppercase">
                {item.title}
              </h3>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                {item.category}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

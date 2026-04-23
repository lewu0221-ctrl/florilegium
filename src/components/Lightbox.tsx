/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { PhotographyWork } from '../types';

interface LightboxProps {
  work: PhotographyWork | null;
  onClose: () => void;
}

export default function Lightbox({ work, onClose }: LightboxProps) {
  if (!work) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row"
        id="lightbox"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-[60] p-2 hover:bg-gray-100 rounded-full transition-colors"
          id="close-lightbox"
        >
          <X className="w-6 h-6 stroke-[1.5px]" />
        </button>

        <div className="flex-1 overflow-hidden flex items-center justify-center p-8 md:p-12 lg:p-24 bg-gray-50">
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={work.imageUrl}
            alt={work.title}
            className="max-w-full max-h-full object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-80 lg:w-[450px] p-8 md:p-12 lg:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                {work.category} / {work.year}
              </p>
              <h2 className="font-sans text-3xl font-light tracking-tight text-gray-900 leading-tight">
                {work.title}
              </h2>
            </div>
            
            <p className="text-gray-500 font-sans leading-relaxed text-sm">
              {work.description}
            </p>

            <div className="pt-8">
              <button 
                className="w-full py-4 border border-gray-900 text-[10px] uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-all"
                onClick={onClose}
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

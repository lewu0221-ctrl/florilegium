/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface LightboxWork {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  year: string;
}

interface LightboxProps {
  work: LightboxWork | null;
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

        <div className="flex-1 overflow-hidden flex items-center justify-center p-4 md:p-12 bg-gray-50/50">
          <motion.img
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={work.imageUrl}
            alt={work.title}
            className="max-sm:max-w-full max-h-[60vh] md:max-h-[90vh] object-contain shadow-2xl bg-white"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-80 lg:w-[450px] p-6 md:p-12 flex flex-col justify-end md:justify-center border-t md:border-t-0 md:border-l border-gray-100 bg-white z-10">
          <div className="space-y-6 md:space-y-8">
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

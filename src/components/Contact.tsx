/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Twitter, ArrowUpRight } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactProps {
  info: ContactInfo;
}

export default function Contact({ info }: ContactProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl py-12 md:py-24"
      id="contact-section"
    >
      <div className="mb-16">
        <h2 className="font-sans text-4xl md:text-5xl font-light tracking-tighter text-gray-900 mb-6">
          Let's talk about <br /> your next vision.
        </h2>
        <p className="text-gray-500 font-sans leading-relaxed">
          Available for international commissions, editorial assignments, and collaborative projects that prioritize visual integrity and storytelling.
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Email</p>
            <a 
              href={`mailto:${info.email}`} 
              className="text-lg font-sans flex items-center group hover:text-black transition-colors"
            >
              {info.email}
              <ArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all w-4 h-4" />
            </a>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Location</p>
            <p className="text-lg font-sans">{info.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Socials</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-black transition-colors">
                <Instagram className="w-5 h-5 stroke-[1.5px]" />
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Twitter className="w-5 h-5 stroke-[1.5px]" />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Collaborations</p>
            <p className="text-lg font-sans">Currently taking bookings for Q3 2024.</p>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-gray-100">
        <p className="font-mono text-[10px] text-gray-300">
          © 2024 LUMINA VISION. ALL RIGHTS RESERVED.
        </p>
      </div>
    </motion.div>
  );
}

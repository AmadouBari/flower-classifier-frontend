'use client';

import { motion } from 'framer-motion';
import { scrollToElement } from '@/utils/client';

export default function Hero() {
  return (
    <div 
      className="relative h-[30vh] md:h-[30vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/flowers-bg.jpg")'
      }}
    >
      <div className="text-center text-white px-4 py-8 md:py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
        >
          Discover the Beauty of <br className="hidden md:block" /> Flowers with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg lg:text-xl mb-6 max-w-xl mx-auto"
        >
          Upload a picture, and our AI will identify the flower and give you details in seconds!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => scrollToElement('upload-section')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-base md:text-lg"
        >
          Upload Your Flower Image
        </motion.button>
      </div>
    </div>
  );
}

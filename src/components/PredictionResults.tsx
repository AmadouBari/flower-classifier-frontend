'use client';

import { motion } from 'framer-motion';

interface Props {
  predictions: Array<{
    name: string;
    probability: number;
  }>;
  selectedImage: string | null;
}

export default function PredictionResults({ predictions, selectedImage }: Props) {
  return (
    <div className="my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg shadow-xl p-6"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {selectedImage && (
            <div className="relative min-h-[400px] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected flower"
                className="w-full h-full object-contain bg-gray-900 rounded-lg"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Predictions</h2>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize text-gray-100">
                      {prediction.name.replace('-', ' ')}
                    </span>
                    <span className="text-purple-400 font-bold">
                      {(prediction.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${prediction.probability * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
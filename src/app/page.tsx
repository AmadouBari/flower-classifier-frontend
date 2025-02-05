'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import ImageUploader from '@/components/ImageUploader';
import PredictionResults from '@/components/PredictionResults';
import ExampleSection from '@/components/ExampleSection';

export default function Home() {
  const [predictions, setPredictions] = useState<null | Array<{
    name: string;
    probability: number;
  }>>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ImageUploader 
          onImageSelect={setSelectedImage}
          onPredictionsReceived={setPredictions}
        />
        {predictions && (
          <PredictionResults 
            predictions={predictions}
            selectedImage={selectedImage}
          />
        )}
        <ExampleSection />
      </div>
    </main>
  );
} 
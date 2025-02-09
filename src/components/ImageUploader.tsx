'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Buffer } from 'buffer';

interface Props {
  onImageSelect: (imageUrl: string | null) => void;
  onPredictionsReceived: (predictions: Array<{ name: string; probability: number }>) => void;
}

export default function ImageUploader({ onImageSelect, onPredictionsReceived }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleImage = useCallback(async (file: File) => {
    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsLoading(true);
    try {
      // Convert image to base64
      const buffer = await file.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');

      // Send to our Next.js API route
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: base64Image
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      onPredictionsReceived(result.predictions);
    } catch (error) {
      console.error('Error classifying image:', error);
      alert(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      setIsLoading(false);
    }
  }, [onImageSelect, onPredictionsReceived]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleImage(file);
    }
  }, [handleImage]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImage(file);
    }
  };

  return (
    <div id="upload-section" className="my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-4 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-purple-400 bg-gray-800' : 'border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <div className="space-y-4">
            <div className="text-6xl">🌸</div>
            <p className="text-xl font-medium text-gray-200">
              Drag and drop your flower image here, or click to select
            </p>
            <p className="text-gray-400">
              Supports JPG, PNG, JPEG
            </p>
          </div>
        </label>
      </motion.div>
      {isLoading && (
        <div className="text-center mt-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></div>
          <p className="mt-2 text-gray-300">Analyzing your flower...</p>
        </div>
      )}
    </div>
  );
}
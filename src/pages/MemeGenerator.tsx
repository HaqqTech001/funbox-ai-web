import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Download, Save, Loader2, Sparkles } from 'lucide-react';
import { generateContent } from '@/utils/geminiAPI';
import { useApp } from '@/contexts/AppContext';
import { getTemplateByIndex } from '@/data/categories';

const MemeGenerator: React.FC = () => {
  const { addToHistory, setError } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [caption, setCaption] = useState('');
  const [captionPosition, setCaptionPosition] = useState<'top' | 'bottom'>('top');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templates = [
    { name: 'Classic', colors: ['#000000', '#FFFFFF'] },
    { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D'] },
    { name: 'Ocean', colors: ['#4ECDC4', '#44A08D'] },
    { name: 'Purple Dream', colors: ['#667eea', '#764ba2'] },
    { name: 'Fire', colors: ['#ff416c', '#ff4b2b'] },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = async (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64.split(',')[1]);
      };
      
      img.onerror = reject;
      img.src = imageUrl;
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError('Please upload an image first');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const base64Image = await convertToBase64(selectedImage);
      const response = await generateContent('meme', caption, undefined, base64Image);
      setGeneratedMeme(response);
      
      // Save to history
      addToHistory({
        type: 'meme',
        content: response.caption,
        templateIndex: response.templateIndex,
        imageUrl: selectedImage,
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      setError('Failed to generate meme. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    // Create a canvas to combine image and text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image
      ctx?.drawImage(img, 0, 0);
      
      // Add caption
      if (generatedMeme?.caption) {
        ctx!.font = 'bold 48px Arial';
        ctx!.fillStyle = 'white';
        ctx!.strokeStyle = 'black';
        ctx!.lineWidth = 4;
        ctx!.textAlign = 'center';
        
        const lines = generatedMeme.caption.split('\n');
        const lineHeight = 60;
        
        lines.forEach((line: string, index: number) => {
          const y = captionPosition === 'top' ? 80 + (index * lineHeight) : canvas.height - 80 - ((lines.length - 1 - index) * lineHeight);
          ctx!.strokeText(line, canvas.width / 2, y);
          ctx!.fillText(line, canvas.width / 2, y);
        });
      }
      
      // Download
      const link = document.createElement('a');
      link.download = 'funbox-meme.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    
    img.src = selectedImage!;
  };

  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
            Meme <span className="text-gradient">Generator</span>
          </h1>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Upload an image and let AI create hilarious meme captions for you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card">
              <h2 className="text-2xl font-heading font-semibold text-white mb-6">
                1. Upload Image
              </h2>
              
              <div 
                className="border-2 border-dashed border-border-dark rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Uploaded" 
                    className="max-w-full max-h-64 mx-auto rounded-lg"
                  />
                ) : (
                  <div className="text-text-secondary-dark">
                    <Upload className="w-12 h-12 mx-auto mb-4" />
                    <p>Click to upload an image</p>
                    <p className="text-sm mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="mt-6">
                <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add context for better meme generation..."
                  className="input w-full"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-text-secondary-dark mb-2">
                  Caption Position
                </label>
                <select
                  value={captionPosition}
                  onChange={(e) => setCaptionPosition(e.target.value as 'top' | 'bottom')}
                  className="input w-full"
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!selectedImage || isGenerating}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Meme...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Meme</span>
                  </div>
                )}
              </button>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="card">
              <h2 className="text-2xl font-heading font-semibold text-white mb-6">
                2. Preview & Download
              </h2>
              
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Meme preview" 
                    className="w-full rounded-lg"
                  />
                  {generatedMeme?.caption && (
                    <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none bg-black/20">
                      {captionPosition === 'top' && (
                        <div className="text-center">
                          <p className="text-white font-bold text-lg lg:text-xl drop-shadow-lg">
                            {generatedMeme.caption}
                          </p>
                        </div>
                      )}
                      {captionPosition === 'bottom' && (
                        <div className="text-center">
                          <p className="text-white font-bold text-lg lg:text-xl drop-shadow-lg">
                            {generatedMeme.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {generatedMeme && (
                    <div className="mt-6 flex space-x-4">
                      <button
                        onClick={handleDownload}
                        className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-text-secondary-dark py-16">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to see preview</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
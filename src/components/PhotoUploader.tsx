import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploaderProps {
  photoBase64?: string;
  onPhotoChange: (base64: string | undefined) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photoBase64, onPhotoChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize/crop image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Target dimensions (portrait aspect ratio)
        const targetWidth = 400;
        const targetHeight = 500;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Calculate dimensions to maintain aspect ratio
        const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (targetWidth - scaledWidth) / 2;
        const y = (targetHeight - scaledHeight) / 2;

        // Draw and crop
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        // Convert to base64
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        onPhotoChange(base64);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [onPhotoChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleRemove = useCallback(() => {
    onPhotoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onPhotoChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Profile Photo</label>
      
      {photoBase64 ? (
        <div className="relative inline-block">
          <img 
            src={photoBase64} 
            alt="Profile" 
            className="w-32 h-40 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }
          `}
        >
          <div className="flex flex-col items-center gap-2">
            {isDragging ? (
              <Upload className="w-8 h-8 text-blue-500" />
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-400" />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Recommended: 400x500px
            </p>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};

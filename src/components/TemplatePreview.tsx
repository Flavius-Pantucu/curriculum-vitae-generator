import React from 'react';
import { useCVStore } from '../stores/useCVStore';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';

export const TemplatePreview: React.FC = () => {
  const { getActiveProfile, activeTemplate } = useCVStore();
  const profile = getActiveProfile();

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No profile selected</p>
          <p className="text-sm mt-2">Create or select a profile to see the preview</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const templateProps = { data: profile.data };
    
    switch (activeTemplate) {
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      case 'executive':
        return <ExecutiveTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <div 
      id="cv-preview" 
      className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto h-full flex items-start justify-center p-8"
    >
      <div 
        className="shadow-2xl bg-white"
        style={{
          width: '210mm', // A4 width
          minHeight: '297mm', // A4 height
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
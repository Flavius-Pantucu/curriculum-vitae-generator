import React from 'react';
import { useCVStore } from '../stores/useCVStore';
import { TemplateType } from '../types/cv.types';
import { Check } from 'lucide-react';

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'ATS-friendly, minimal design' },
  { id: 'modern', name: 'Modern', description: 'Color accents, clean cards' },
  { id: 'creative', name: 'Creative', description: 'Gradient sidebar, icons' },
  { id: 'minimal', name: 'Minimal', description: 'Single column, spacious' },
  { id: 'executive', name: 'Executive', description: '2-column, premium look' },
];

export const TemplateSelector: React.FC = () => {
  const { activeTemplate, setActiveTemplate } = useCVStore();

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-3">
        Templates
      </h3>
      <div className="space-y-1">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setActiveTemplate(template.id)}
            className={`
              w-full text-left p-3 rounded-lg transition-all
              ${activeTemplate === template.id
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {template.description}
                </div>
              </div>
              {activeTemplate === template.id && (
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

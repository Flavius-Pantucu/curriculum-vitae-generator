import React, { useEffect } from 'react';
import { useCVStore } from './stores/useCVStore';
import { ProfileManager } from './components/ProfileManager';
import { TemplateSelector } from './components/TemplateSelector';
import { SectionForms } from './components/SectionForms';
import { TemplatePreview } from './components/TemplatePreview';
import { ExportButtons } from './components/ExportButtons';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const { darkMode, toggleDarkMode } = useCVStore();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Auto-save is handled by Zustand persist
        console.log('Auto-saved');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        document.querySelector<HTMLButtonElement>('[data-action="print"]')?.click();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        document.querySelector<HTMLButtonElement>('[data-action="export-pdf"]')?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CV Builder
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Create professional resumes in minutes
          </p>
        </div>

        {/* Profile Manager */}
        <div className="mb-8">
          <ProfileManager />
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <TemplateSelector />
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
            Shortcuts
          </h4>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd> Save</div>
            <div><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+E</kbd> Export PDF</div>
            <div><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+P</kbd> Print</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resume Editor</h2>
            <ExportButtons />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Forms Section - 40% */}
          <div className="w-2/5 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <SectionForms />
          </div>

          {/* Preview Section - 60% */}
          <div className="flex-1 p-6 overflow-hidden">
            <TemplatePreview />
          </div>
        </div>
      </div>
    </div>
  );
}

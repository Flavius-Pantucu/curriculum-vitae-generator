import React, { useState } from 'react';
import { useCVStore } from '../stores/useCVStore';
import { Plus, Copy, Trash2, FileText, Edit2, Check, X } from 'lucide-react';

export const ProfileManager: React.FC = () => {
  const { profiles, activeProfileId, setActiveProfile, createProfile, deleteProfile, duplicateProfile, updateProfileName } = useCVStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = () => {
    if (newProfileName.trim()) {
      createProfile(newProfileName.trim());
      setNewProfileName('');
      setIsCreating(false);
    }
  };

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      updateProfileName(editingId, editingName.trim());
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const profileList = Object.values(profiles);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
          Profiles
        </h3>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          title="Create new profile"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isCreating && (
        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <input
            type="text"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Profile name..."
            className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') setIsCreating(false);
            }}
          />
          <button
            onClick={handleCreate}
            className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded"
          >
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          >
            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      )}

      <div className="space-y-1">
        {profileList.map((profile) => (
          <div
            key={profile.id}
            className={`
              group rounded-lg transition-colors
              ${activeProfileId === profile.id 
                ? 'bg-blue-100 dark:bg-blue-900' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {editingId === profile.id ? (
              <div className="flex items-center gap-2 p-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <button
                  onClick={handleSaveEdit}
                  className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                >
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                >
                  <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2">
                <FileText className="w-4 h-4 flex-shrink-0" />
                <button
                  onClick={() => setActiveProfile(profile.id)}
                  className="flex-1 text-left text-sm truncate"
                  title={profile.name}
                >
                  {profile.name}
                </button>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleStartEdit(profile.id, profile.name)}
                    className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                    title="Rename"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => duplicateProfile(profile.id)}
                    className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {profileList.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${profile.name}"?`)) {
                          deleteProfile(profile.id);
                        }
                      }}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, CVProfile, TemplateType, CVData } from '../types/cv.types';
import { getSampleCVData } from '../utils/sample-data';

interface CVStore extends AppState {
  // Profile actions
  createProfile: (name: string) => void;
  deleteProfile: (id: string) => void;
  duplicateProfile: (id: string) => void;
  setActiveProfile: (id: string) => void;
  updateProfileName: (id: string, name: string) => void;
  updateProfileData: (id: string, data: Partial<CVData>) => void;
  
  // Template actions
  setActiveTemplate: (template: TemplateType) => void;
  
  // Theme actions
  toggleDarkMode: () => void;
  
  // Helper getters
  getActiveProfile: () => CVProfile | null;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      profiles: {
        'default': {
          id: 'default',
          name: 'Software Engineer Profile',
          data: getSampleCVData(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      activeProfileId: 'default',
      activeTemplate: 'modern',
      darkMode: false,

      createProfile: (name: string) => {
        const id = generateId();
        const newProfile: CVProfile = {
          id,
          name,
          data: {
            personal: {
              name: '',
              email: '',
              phone: '',
              linkedin: '',
              location: '',
              summary: '',
            },
            education: [],
            experience: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            hobbies: [],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          profiles: { ...state.profiles, [id]: newProfile },
          activeProfileId: id,
        }));
      },

      deleteProfile: (id: string) => {
        set((state) => {
          const { [id]: _, ...remainingProfiles } = state.profiles;
          const profileIds = Object.keys(remainingProfiles);
          const newActiveId = state.activeProfileId === id 
            ? (profileIds[0] || null)
            : state.activeProfileId;

          return {
            profiles: remainingProfiles,
            activeProfileId: newActiveId,
          };
        });
      },

      duplicateProfile: (id: string) => {
        const profile = get().profiles[id];
        if (!profile) return;

        const newId = generateId();
        const duplicatedProfile: CVProfile = {
          ...profile,
          id: newId,
          name: `${profile.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          profiles: { ...state.profiles, [newId]: duplicatedProfile },
          activeProfileId: newId,
        }));
      },

      setActiveProfile: (id: string) => {
        set({ activeProfileId: id });
      },

      updateProfileName: (id: string, name: string) => {
        set((state) => ({
          profiles: {
            ...state.profiles,
            [id]: {
              ...state.profiles[id],
              name,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },

      updateProfileData: (id: string, data: Partial<CVData>) => {
        set((state) => {
          const profile = state.profiles[id];
          if (!profile) return state;

          return {
            profiles: {
              ...state.profiles,
              [id]: {
                ...profile,
                data: { ...profile.data, ...data },
                updatedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      setActiveTemplate: (template: TemplateType) => {
        set({ activeTemplate: template });
      },

      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
      },

      getActiveProfile: () => {
        const state = get();
        return state.activeProfileId ? state.profiles[state.activeProfileId] : null;
      },
    }),
    {
      name: 'cv-builder-storage',
    }
  )
);

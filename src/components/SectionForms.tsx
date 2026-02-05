import React, { useState } from 'react';
import { useCVStore } from '../stores/useCVStore';
import { PhotoUploader } from './PhotoUploader';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { SkillLevel } from '../types/cv.types';

type TabType = 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'certifications' | 'languages' | 'hobbies';

const tabs: { id: TabType; label: string }[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
  { id: 'hobbies', label: 'Hobbies' },
];

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const SectionForms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const { getActiveProfile, updateProfileData, activeProfileId } = useCVStore();
  const profile = getActiveProfile();

  if (!profile || !activeProfileId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-8">
        <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">No profile selected</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Create or select a profile to get started.</p>
        </div>
      </div>
    );
  }

  const { data } = profile;

  const updatePersonal = (field: string, value: string) => {
    updateProfileData(activeProfileId, {
      personal: { ...data.personal, [field]: value },
    });
  };

  const updatePhoto = (photoBase64: string | undefined) => {
    updateProfileData(activeProfileId, {
      personal: { ...data.personal, photoBase64 },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto p-4 bg-white dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        {activeTab === 'personal' && (
          <PersonalForm 
            data={data.personal} 
            onChange={updatePersonal}
            onPhotoChange={updatePhoto}
          />
        )}
        {activeTab === 'education' && (
          <EducationForm
            items={data.education}
            onChange={(items) => updateProfileData(activeProfileId, { education: items })}
          />
        )}
        {activeTab === 'experience' && (
          <ExperienceForm
            items={data.experience}
            onChange={(items) => updateProfileData(activeProfileId, { experience: items })}
          />
        )}
        {activeTab === 'skills' && (
          <SkillsForm
            items={data.skills}
            onChange={(items) => updateProfileData(activeProfileId, { skills: items })}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsForm
            items={data.projects}
            onChange={(items) => updateProfileData(activeProfileId, { projects: items })}
          />
        )}
        {activeTab === 'certifications' && (
          <CertificationsForm
            items={data.certifications}
            onChange={(items) => updateProfileData(activeProfileId, { certifications: items })}
          />
        )}
        {activeTab === 'languages' && (
          <LanguagesForm
            items={data.languages}
            onChange={(items) => updateProfileData(activeProfileId, { languages: items })}
          />
        )}
        {activeTab === 'hobbies' && (
          <HobbiesForm
            items={data.hobbies}
            onChange={(items) => updateProfileData(activeProfileId, { hobbies: items })}
          />
        )}
      </div>
    </div>
  );
};

// Personal Form Component
const PersonalForm: React.FC<{
  data: any;
  onChange: (field: string, value: string) => void;
  onPhotoChange: (photo: string | undefined) => void;
}> = ({ data, onChange, onPhotoChange }) => {
  return (
    <div className="space-y-4 max-w-2xl">
      <PhotoUploader photoBase64={data.photoBase64} onPhotoChange={onPhotoChange} />
      
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Professional Summary</label>
        <textarea
          value={data.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          placeholder="Brief overview of your professional background and key strengths..."
        />
      </div>
    </div>
  );
};

// Education Form Component
const EducationForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      school: '',
      degree: '',
      field: '',
      dates: { from: '', to: '' },
      gpa: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    if (field.startsWith('dates.')) {
      const dateField = field.split('.')[1];
      updated[index] = {
        ...updated[index],
        dates: { ...updated[index].dates, [dateField]: value },
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-sm">Education {index + 1}</span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">School/University *</label>
              <input
                type="text"
                value={item.school}
                onChange={(e) => updateItem(index, 'school', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Stanford University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Degree *</label>
              <input
                type="text"
                value={item.degree}
                onChange={(e) => updateItem(index, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Field of Study *</label>
            <input
              type="text"
              value={item.field}
              onChange={(e) => updateItem(index, 'field', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Computer Science"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">From *</label>
              <input
                type="text"
                value={item.dates.from}
                onChange={(e) => updateItem(index, 'dates.from', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="2018-09"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To *</label>
              <input
                type="text"
                value={item.dates.to}
                onChange={(e) => updateItem(index, 'dates.to', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="2022-06"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GPA</label>
              <input
                type="text"
                value={item.gpa || ''}
                onChange={(e) => updateItem(index, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="3.8"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
};

// Experience Form Component
const ExperienceForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      company: '',
      position: '',
      dates: { from: '', to: '' },
      responsibilities: '',
      achievements: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    if (field.startsWith('dates.')) {
      const dateField = field.split('.')[1];
      updated[index] = {
        ...updated[index],
        dates: { ...updated[index].dates, [dateField]: value },
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-sm">Experience {index + 1}</span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateItem(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="TechCorp Inc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position *</label>
              <input
                type="text"
                value={item.position}
                onChange={(e) => updateItem(index, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Senior Software Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">From *</label>
              <input
                type="text"
                value={item.dates.from}
                onChange={(e) => updateItem(index, 'dates.from', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="2020-03"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To *</label>
              <input
                type="text"
                value={item.dates.to}
                onChange={(e) => updateItem(index, 'dates.to', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Responsibilities</label>
            <textarea
              value={item.responsibilities}
              onChange={(e) => updateItem(index, 'responsibilities', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Main responsibilities and duties..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Achievements</label>
            <textarea
              value={item.achievements}
              onChange={(e) => updateItem(index, 'achievements', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Key achievements and impact..."
            />
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );
};

// Skills Form Component
const SkillsForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      name: '',
      level: 'intermediate' as SkillLevel,
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="Skill name"
          />
          <select
            value={item.level}
            onChange={(e) => updateItem(index, 'level', e.target.value as SkillLevel)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
          <button
            onClick={() => removeItem(index)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>
    </div>
  );
};

// Projects Form Component
const ProjectsForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      name: '',
      description: '',
      technologies: '',
      url: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-sm">Project {index + 1}</span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Project Name *</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="E-Commerce Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Project description and key features..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies</label>
            <input
              type="text"
              value={item.technologies}
              onChange={(e) => updateItem(index, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              value={item.url || ''}
              onChange={(e) => updateItem(index, 'url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="github.com/username/project"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
};

// Certifications Form Component
const CertificationsForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-sm">Certification {index + 1}</span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Certification Name *</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issuer *</label>
              <input
                type="text"
                value={item.issuer}
                onChange={(e) => updateItem(index, 'issuer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateItem(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="2022-08"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="text"
                value={item.url || ''}
                onChange={(e) => updateItem(index, 'url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="credential-url.com"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </button>
    </div>
  );
};

// Languages Form Component
const LanguagesForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      name: '',
      level: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="Language name"
          />
          <input
            type="text"
            value={item.level || ''}
            onChange={(e) => updateItem(index, 'level', e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="Level"
          />
          <button
            onClick={() => removeItem(index)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Language
      </button>
    </div>
  );
};

// Hobbies Form Component
const HobbiesForm: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, {
      id: generateId(),
      name: '',
    }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="Hobby or interest"
          />
          <button
            onClick={() => removeItem(index)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Hobby
      </button>
    </div>
  );
};
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TemplateType = 'classic' | 'modern' | 'creative' | 'minimal' | 'executive';

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  summary: string;
  photoBase64?: string;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  dates: DateRange;
  gpa?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  dates: DateRange;
  responsibilities: string;
  achievements: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level?: string;
}

export interface HobbyItem {
  id: string;
  name: string;
  level?: string;
}

export interface CVData {
  personal: PersonalData;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  hobbies: HobbyItem[];
}

export interface CVProfile {
  id: string;
  name: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  profiles: Record<string, CVProfile>;
  activeProfileId: string | null;
  activeTemplate: TemplateType;
  darkMode: boolean;
}

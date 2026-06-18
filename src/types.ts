export type ActiveTab = 'home' | 'about' | 'projects' | 'blogs' | 'activity' | 'extracurricular' | 'crm';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  fontClassClass: string; // Tailwind class selection
  bgClass: string;
  textClass: string;
  cardBgClass: string;
  cardBorderClass: string;
  accentClass: string;
  accentTextClass: string;
  nodeColor: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  category: 'Cloud' | 'Security' | 'Systems';
  featured: boolean;
  longDescription: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  views: number;
}

export interface ActivityTracker {
  id: string;
  name: string;
  category: 'coding' | 'fitness' | 'learning' | 'wellbeing';
  target: number;
  current: number;
  unit: string;
  color: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  subRole: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  bio: string;
  skills: SkillGroup[];
  education: Education[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

export interface ExtraCurricularEntry {
  id: string;
  title: string;
  role: string;
  description: string;
}



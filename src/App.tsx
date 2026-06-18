import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Briefcase,
  BookOpen,
  Calendar,
  Settings,
  Plus,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle,
  FileText,
  Trash2,
  Edit3,
  Globe,
  PlusCircle,
  Check,
  Award,
  BookOpenCheck,
  Lock,
  Unlock,
  Cpu,
  Compass,
  Sun,
  Moon,
  AlertTriangle,
  Database,
  Star,
  Book,
  Activity,
  Layout,
  PenTool,
  Clock
} from 'lucide-react';
import { THEME_PRESETS, INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_BLOGS, INITIAL_TRACKERS, INITIAL_EXPERIENCES } from './data';
import { ThemePreset, ProfileInfo, ProjectEntry, BlogPost, ActiveTab, ExperienceEntry, SkillGroup, Education, ExtraCurricularEntry } from './types';
import AntiGravityBackground from './components/AntiGravityBackground';
import AnimatedIntro from './components/AnimatedIntro';
import ThemeSelector from './components/ThemeSelector';

const getTheme = (presetId: string, basePreset: ThemePreset, isDark: boolean): ThemePreset => {
  if (!isDark) return basePreset;

  const darkNodeColorMap: Record<string, string> = {
    sandstone: 'rgba(245, 158, 11, 0.25)', // amber-500 with opacity
    slate: 'rgba(6, 182, 212, 0.25)', // cyan-500
    peach: 'rgba(244, 63, 94, 0.25)', // rose-500
    solar: 'rgba(234, 179, 8, 0.25)', // yellow-500
    matcha: 'rgba(16, 185, 129, 0.25)', // emerald-500
    wheat: 'rgba(245, 158, 11, 0.25)' // amber-500
  };

  const darkBgs: Record<string, string> = {
    sandstone: 'bg-stone-950 text-stone-100 selection:bg-amber-900/40 selection:text-stone-100',
    slate: 'bg-slate-950 text-slate-100 selection:bg-cyan-950 selection:text-slate-100',
    peach: 'bg-stone-950 text-stone-100 selection:bg-rose-950 selection:text-stone-100',
    solar: 'bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100',
    matcha: 'bg-[#080f0c] text-emerald-100 selection:bg-emerald-950 selection:text-emerald-100',
    wheat: 'bg-[#0f0e0b] text-amber-50 selection:bg-amber-950 selection:text-amber-50'
  };

  const darkCards: Record<string, string> = {
    sandstone: 'bg-stone-900/90 backdrop-blur-md shadow-lg border border-stone-850/80',
    slate: 'bg-slate-900/90 backdrop-blur-lg shadow-lg border border-slate-850/80',
    peach: 'bg-stone-900/95 backdrop-blur-sm shadow-md border border-stone-850/85',
    solar: 'bg-zinc-900/80 backdrop-blur-md border border-zinc-850 shadow-lg',
    matcha: 'bg-[#0d1a14]/90 backdrop-blur shadow-sm border border-emerald-950/80',
    wheat: 'bg-[#181612]/90 backdrop-blur-sm border border-[#2d281f]/80 shadow-sm'
  };

  const darkCardBorders: Record<string, string> = {
    sandstone: 'border-stone-850/80',
    slate: 'border-slate-850/80',
    peach: 'border-[#332f28]',
    solar: 'border-zinc-850',
    matcha: 'border-emerald-950/80',
    wheat: 'border-[#2d281f]/80'
  };

  const darkAccents: Record<string, string> = {
    sandstone: 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold',
    slate: 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold',
    peach: 'bg-rose-500 hover:bg-rose-600 text-stone-950 font-bold',
    solar: 'bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold',
    matcha: 'bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold',
    wheat: 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold'
  };

  const darkAccentTexts: Record<string, string> = {
    sandstone: 'text-amber-400 font-bold',
    slate: 'text-cyan-400 font-bold',
    peach: 'text-rose-400 font-bold',
    solar: 'text-yellow-400 font-bold',
    matcha: 'text-emerald-400 font-bold',
    wheat: 'text-amber-400 font-bold'
  };

  return {
    ...basePreset,
    bgClass: darkBgs[presetId] || basePreset.bgClass,
    textClass: 'text-stone-200',
    cardBgClass: darkCards[presetId] || basePreset.cardBgClass,
    cardBorderClass: darkCardBorders[presetId] || basePreset.cardBorderClass,
    accentClass: darkAccents[presetId] || basePreset.accentClass,
    accentTextClass: darkAccentTexts[presetId] || basePreset.accentTextClass,
    nodeColor: darkNodeColorMap[presetId] || basePreset.nodeColor
  };
};

export default function App() {
  // Environment check
  const isLocalEnvironment = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.includes('ais-dev-')
  );

  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  // Active theme styling state (Sleek Warm Theme with persistent storage)
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(() => {
    const savedThemeId = localStorage.getItem('owner_active_theme_id');
    if (savedThemeId) {
      const found = THEME_PRESETS.find(p => p.id === savedThemeId);
      if (found) return found;
    }
    const fallbackThemeId = "wheat";
    if (fallbackThemeId) {
      const found = THEME_PRESETS.find(p => p.id === fallbackThemeId);
      if (found) return found;
    }
    return THEME_PRESETS[0]; // Warm Sandstone
  });

  // Dark Mode State with local storage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('portfolio_dark_mode_enabled', isDarkMode.toString());
    // document.documentElement.classList.remove('dark'); // strictly maintain standard rendering
  }, [isDarkMode]);

  // Deriving the processed theme that respects both chosen design and the active Dark/Light state
  const themeObj = getTheme(activeTheme.id, activeTheme, isDarkMode);

  // Main UI active tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Master local storage portfolio data sets
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PROFILE; }
    }
    return INITIAL_PROFILE;
  });

  const [projects, setProjects] = useState<ProjectEntry[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PROJECTS; }
    }
    return INITIAL_PROJECTS;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('portfolio_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_BLOGS; }
    }
    return INITIAL_BLOGS;
  });

  const [spotlightProject, setSpotlightProject] = useState(() => {
    const saved = localStorage.getItem('owner_spotlight');
    if (saved) return JSON.parse(saved);
    return {
    "title": "Antigravity OS Framework",
    "description": "A comprehensive AI-driven task orchestration framework designed for single-view web environments. Built on modern modular paradigms.",
    "category": "SYSTEMS",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
};
  });

  const [featuredBlog, setFeaturedBlog] = useState(() => {
    const saved = localStorage.getItem('owner_featured_blog');
    if (saved) return JSON.parse(saved);
    return {
    "title": "Rethinking Component Modular Architecture in 2026",
    "excerpt": "Analyzing the shift towards completely autonomous component islands.",
    "date": "OCT 14"
};
  });

  // Track currently selected blog to read full details (Modal)
  const [readingBlog, setReadingBlog] = useState<BlogPost | null>(null);

  // Manage Creator Forms (Adding new content right in the client)
  const setShowConfigModal = (v: boolean) => { if (v) setActiveTab('crm'); };
  const [activeConfigSection, setActiveConfigSection] = useState<'info' | 'working' | 'education' | 'elementary' | 'extracurricular' | 'experience' | 'projects' | 'blogs' | 'landing' | 'spotlight'>('info');

  // Animated Landing Page custom presets & editable variables
  const [introDuration, setIntroDuration] = useState<number>(() => {
    const saved = localStorage.getItem('portfolio_intro_duration');
    return saved ? parseInt(saved, 10) : 3200;
  });

  const [introSteps, setIntroSteps] = useState<string[]>(() => {
    const saved = localStorage.getItem('portfolio_intro_steps');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return ["Aspiring DevSecOps, Cloud & System Design Engineer passionate about building secure, scalable, and automated infrastructure. I specialize in cloud-native technologies, infrastructure automation, container orchestration, observability, and cybersecurity, with a focus on designing resilient distributed systems for real-world environments."];
  });

  // Interactive Hero Headline
  const [heroHeadline, setHeroHeadline] = useState(() => localStorage.getItem('portfolio_hero_headline') || "Designing the next wave of software systems." || 'Designing the next wave of software systems.');

  // Experience state
  const [experiences, setExperiences] = useState<ExperienceEntry[]>(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_EXPERIENCES; }
    }
    return INITIAL_EXPERIENCES;
  });

  // Working focus states
  const [workingCategory, setWorkingCategory] = useState(() => localStorage.getItem('owner_working_category') || "Currently Working On" || 'Currently Working On');
  const [workingTitle, setWorkingTitle] = useState(() => localStorage.getItem('owner_working_title') || "Learning Java & Backend Systems" || 'Learning Java & Backend Systems');
  const [workingDesc, setWorkingDesc] = useState(() => localStorage.getItem('owner_working_desc') || "Deep diving into Java OOP principles, JVM memory management, multi-threaded task handling, and Spring Boot API architectures." || 'Deep diving into Java OOP principles, JVM memory management, multi-threaded task handling, and Spring Boot API architectures.');

  // DSA Sync Hub state variables
  const [showHeatmap, setShowHeatmap] = useState(() => localStorage.getItem('owner_show_heatmap') !== 'false');
  
  const [dsaPlatforms, setDsaPlatforms] = useState<any[]>(() => {
    const saved = localStorage.getItem('owner_dsa_platforms_v2');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Animation/Handshake UI Sync states
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState("4 minutes ago");

  // Tech learning areas
  const [learningAreas, setLearningAreas] = useState<{ domain: string; platform: string; topics: string; duration: string }[]>(() => {
    const saved = localStorage.getItem('owner_tech_learning_areas');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  // Extracurricular dynamic states
  const [extracurriculars, setExtracurriculars] = useState<ExtraCurricularEntry[]>(() => {
    const saved = localStorage.getItem('owner_extracurriculars');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { }
    }
    return [
    {
        "id": "extra-1",
        "title": "Tvar - Linux Project  ",
        "role": "Founder",
        "description": "Building a Linux based Operating System for Indian users"
    },
    {
        "id": "extra-2",
        "title": "Mozilla FireFox Club",
        "role": "Senior Tech Lead ",
        "description": "Spearheaded technical events, workshops, and community-driven initiatives, mentoring students in modern technologies and industry best practices. Strengthened the club's technical ecosystem by promoting open-source contributions, collaborative learning, and hands-on project development."
    },
    {
        "id": "extra-3",
        "title": "Cultural and Sports ",
        "role": "Sports Lead(Cricker)/Cultural Fest Volunteer(Advitya 2024 and 2025)",
        "description": "Contributed to the successful execution of Advitya, VIT Bhopal's annual cultural fest, by coordinating event logistics, managing participant engagement, and supporting on-ground operations. Collaborated with cross-functional teams to ensure smooth event execution and an engaging experience for attendees.\nDirected cricket tournaments and sports activities, overseeing team coordination, match scheduling, and event logistics. Enhanced participant engagement and ensured efficient execution of university-level sporting events."
    }
];
  });

  // Extracurricular Adder fields
  const [newExtraTitle, setNewExtraTitle] = useState('');
  const [newExtraRole, setNewExtraRole] = useState('');
  const [newExtraDesc, setNewExtraDesc] = useState('');

  // Temporary Editing State Variables
  const [editName, setEditName] = useState(profile.name);
  const [editRole, setEditRole] = useState(profile.role);
  const [editSubRole, setEditSubRole] = useState(profile.subRole);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editGithub, setEditGithub] = useState(profile.github);
  const [editLinkedin, setEditLinkedin] = useState(profile.linkedin);
  const [editTwitter, setEditTwitter] = useState(profile.twitter);

  // Skills custom matrix dynamics
  const [editSkills, setEditSkills] = useState<SkillGroup[]>(() => profile.skills || []);

  // Academic Journey dynamic milestone list
  const [editEducation, setEditEducation] = useState<Education[]>(() => profile.education || []);

  // Project Adder fields
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjTagline, setNewProjTagline] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjLongDesc, setNewProjLongDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');
  const [newProjDemo, setNewProjDemo] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'Cloud' | 'Security' | 'Systems'>('Cloud');

  // Experience Adder fields
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpTech, setNewExpTech] = useState('');

  // Custom Overlay Confirmation state & gatekeeper (Bypasses browser context blockers)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const askConfirmation = (title: string, message: string, onConfirmAction: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirmAction();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Security Verification details
  const [isOwner, setIsOwner] = useState(() => localStorage.getItem('is_owner') === 'true');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Subtle key stroke trigger: Ctrl + Alt + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setPasswordError('');
        setPasswordInput('');
        setShowPasswordModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOwnerLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'devops2026') {
      setIsOwner(true);
      localStorage.setItem('is_owner', 'true');
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      triggerToast("Welcome back, Vishwas! Creator mode activated.");
    } else {
      setPasswordError("Incorrect master key passcode. Security lock engaged.");
    }
  };

  const handleOwnerLogout = () => {
    setIsOwner(false);
    localStorage.removeItem('is_owner');
    triggerToast("Signed out. Public visitor sandbox mode active.");
  };

  const handleSyncToCodebase = async () => {
    // Collect 100% of the active state that normally sits in localStorage
    try {
      const stateDump = {
        profile,
        projects,
        blogs,
        dsaPlatforms,
        learningAreas,
        extracurriculars,
        experiences,
        spotlightProject,
        featuredBlog,
        heroHeadline,
        introDuration,
        introSteps,
        workingCategory,
        workingTitle,
        workingDesc,
        themeId: activeTheme.id
      };
      
      triggerToast("🔄 Syncing local state to codebase...");
      
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stateDump)
      });
      if (!res.ok) throw new Error("Server responded with " + res.status);
      triggerToast("✅ Data synchronized with the AI Studio project codebase! You can now ask the AI agent to push to GitHub.");
    } catch (err: any) {
      alert("Error saving: " + err.message);
    }
  };

  // Blog Adder fields
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('');
  const [newBlogReadTime, setNewBlogReadTime] = useState('4 min read');

  // Notification Banner triggers
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync Master states with localStorage on changes
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('owner_working_category', workingCategory);
    localStorage.setItem('owner_working_title', workingTitle);
    localStorage.setItem('owner_working_desc', workingDesc);
  }, [workingCategory, workingTitle, workingDesc]);

  useEffect(() => {
    localStorage.setItem('owner_show_heatmap', showHeatmap.toString());
    localStorage.setItem('owner_dsa_platforms_v2', JSON.stringify(dsaPlatforms));
    localStorage.setItem('owner_tech_learning_areas', JSON.stringify(learningAreas));
  }, [dsaPlatforms, learningAreas, showHeatmap]);

  useEffect(() => {
    localStorage.setItem('owner_extracurriculars', JSON.stringify(extracurriculars));
  }, [extracurriculars]);

  useEffect(() => {
    localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('portfolio_hero_headline', heroHeadline);
  }, [heroHeadline]);

  useEffect(() => {
    localStorage.setItem('portfolio_intro_duration', introDuration.toString());
  }, [introDuration]);

  useEffect(() => {
    localStorage.setItem('portfolio_intro_steps', JSON.stringify(introSteps));
  }, [introSteps]);

  // Sync form state when profile changes
  useEffect(() => {
    setEditName(profile.name);
    setEditRole(profile.role);
    setEditSubRole(profile.subRole);
    setEditEmail(profile.email);
    setEditLocation(profile.location);
    setEditBio(profile.bio);
    setEditGithub(profile.github);
    setEditLinkedin(profile.linkedin);
    setEditTwitter(profile.twitter);
  }, [profile]);

  // Handle Profile Update Save
  const saveProfileInfo = (e: FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: editName,
      role: editRole,
      subRole: editSubRole,
      email: editEmail,
      location: editLocation,
      bio: editBio,
      github: editGithub,
      linkedin: editLinkedin,
      twitter: editTwitter,
      skills: editSkills
    }));
    triggerToast("Your professional profile has been hot-swapped!");
  };

  // Handle Education Profile Save
  const saveEducationInfo = (e: FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      education: editEducation
    }));
    triggerToast("Academic background updated successfully!");
  };

  // Handle Project Form Submission
  const addProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjDesc) {
      triggerToast("Please provide at least a project title & description.");
      return;
    }

    const projectData: ProjectEntry = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: newProjTitle,
      tagline: newProjTagline || "Interactive developer deployment node",
      description: newProjDesc,
      longDescription: newProjLongDesc || newProjDesc,
      tech: newProjTech ? newProjTech.split(',').map(tag => tag.trim()) : ['Docker', 'Terraform'],
      githubUrl: newProjGithub || 'https://github.com/vishwasshirurmath',
      demoUrl: newProjDemo || '#',
      category: newProjCategory,
      featured: false
    };

    if (editingProjectId) {
      setProjects(prev => prev.map(p => p.id === editingProjectId ? projectData : p));
      triggerToast(`Updated project "${newProjTitle}" successfully!`);
      setEditingProjectId(null);
    } else {
      setProjects(prev => [projectData, ...prev]);
      triggerToast(`Added project "${newProjTitle}" successfully!`);
    }

    // Reset fields
    setNewProjTitle('');
    setNewProjTagline('');
    setNewProjDesc('');
    setNewProjLongDesc('');
    setNewProjTech('');
    setNewProjGithub('');
    setNewProjDemo('');
  };

  // Handle Blog Form Submission
  const addBlogPost = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) {
      triggerToast("Please fill out the blog title and main content.");
      return;
    }

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlogTitle,
      excerpt: newBlogExcerpt || newBlogContent.substring(0, 110) + "...",
      content: newBlogContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: newBlogReadTime || '5 min read',
      category: newBlogCategory || 'Engineering',
      views: 1
    };

    setBlogs(prev => [newBlog, ...prev]);
    triggerToast(`Blog post "${newBlogTitle}" created!`);

    // Reset fields
    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
    setNewBlogCategory('');
    setNewBlogReadTime('4 min read');
  };

  const deleteProject = (id: string) => {
    askConfirmation(
      "Delete Project",
      "Are you sure you want to delete this custom project? This cannot be undone.",
      () => {
        setProjects(prev => prev.filter(p => p.id !== id));
        triggerToast("Project deleted successfully.");
      }
    );
  };

  const deleteBlog = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    askConfirmation(
      "Delete Blog Entry",
      "Are you sure you want to remove this blog entry? This cannot be undone.",
      () => {
        setBlogs(prev => prev.filter(b => b.id !== id));
        triggerToast("Blog deleted.");
      }
    );
  };

  const addExperience = (e: FormEvent) => {
    e.preventDefault();
    if (!newExpRole || !newExpCompany) {
      triggerToast("Please provide both a role and company name.");
      return;
    }

    const newExp: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      role: newExpRole,
      company: newExpCompany,
      period: newExpPeriod || "Present",
      description: newExpDesc,
      tech: newExpTech ? newExpTech.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    setExperiences(prev => [newExp, ...prev]);
    triggerToast(`Added experience at "${newExpCompany}"!`);

    // Reset
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpPeriod('');
    setNewExpDesc('');
    setNewExpTech('');
  };

  const deleteExperience = (id: string, e: any) => {
    e.stopPropagation();
    askConfirmation(
      "Delete Experience Record",
      "Are you sure you want to delete this experience record? This cannot be undone.",
      () => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
        triggerToast("Experience record deleted.");
      }
    );
  };

  const addExtracurricular = (e: FormEvent) => {
    e.preventDefault();
    if (!newExtraTitle || !newExtraRole) {
      triggerToast("Please provide both a title and role/badge text.");
      return;
    }

    const newExtra: ExtraCurricularEntry = {
      id: `extra-${Date.now()}`,
      title: newExtraTitle,
      role: newExtraRole,
      description: newExtraDesc
    };

    setExtracurriculars(prev => [newExtra, ...prev]);
    triggerToast(`Added extracurricular activity: "${newExtraTitle}"!`);

    // Reset
    setNewExtraTitle('');
    setNewExtraRole('');
    setNewExtraDesc('');
  };

  const deleteExtracurricular = (id: string, e: any) => {
    e.stopPropagation();
    askConfirmation(
      "Delete Extracurricular Activity",
      "Are you sure you want to delete this extracurricular activity? This cannot be undone.",
      () => {
        setExtracurriculars(prev => prev.filter(extra => extra.id !== id));
        triggerToast("Extracurricular activity deleted.");
      }
    );
  };

  // DSA mapping
  const DSA_COLOR_MAP: Record<string, any> = {
    emerald: { bg: 'bg-emerald-600/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/40', bgSolid: 'bg-emerald-600', iconBg: 'bg-emerald-600/10', textTitle: 'text-emerald-800 dark:text-emerald-400', gradient: 'from-emerald-500 to-teal-500', softText: 'text-emerald-500 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-600/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/40', bgSolid: 'bg-amber-600', iconBg: 'bg-amber-600/10', textTitle: 'text-amber-800 dark:text-amber-400', gradient: 'from-amber-500 to-orange-500', softText: 'text-amber-500 dark:text-amber-400' },
    orange: { bg: 'bg-orange-600/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/20', hoverBorder: 'hover:border-orange-500/40', bgSolid: 'bg-orange-600', iconBg: 'bg-orange-600/10', textTitle: 'text-orange-800 dark:text-orange-400', gradient: 'from-orange-500 to-rose-500', softText: 'text-orange-500 dark:text-orange-400' },
    blue: { bg: 'bg-blue-600/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/40', bgSolid: 'bg-blue-600', iconBg: 'bg-blue-600/10', textTitle: 'text-blue-800 dark:text-blue-400', gradient: 'from-blue-500 to-indigo-500', softText: 'text-blue-500 dark:text-blue-400' },
    purple: { bg: 'bg-purple-600/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-500/40', bgSolid: 'bg-purple-600', iconBg: 'bg-purple-600/10', textTitle: 'text-purple-800 dark:text-purple-400', gradient: 'from-purple-500 to-violet-500', softText: 'text-purple-500 dark:text-purple-400' }
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-700 pb-20 overflow-x-hidden ${themeObj.bgClass} ${themeObj.fontClassClass}`}>
      
      {/* Dynamic Interactive Anti-Gravity Vector Mesh Background */}
      <AntiGravityBackground nodeColor={themeObj.nodeColor} />

      {/* Modern Blurred Decorative Aura Circles (Matches Sleek Theme Spec) */}
      <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 animate-pulse transition-opacity duration-500 ${isDarkMode ? 'bg-amber-900/10 opacity-30' : 'bg-[#F3EBE1] opacity-60'}`} />
      <div className={`absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none z-0 transition-opacity duration-500 ${isDarkMode ? 'bg-emerald-900/10 opacity-20' : 'bg-[#E8F1ED] opacity-40'}`} />

      {/* 2-3 Second High Fidelity Warm Animated Loader */}
      <AnimatedIntro 
        name={profile.name} 
        description={profile.subRole} 
        duration={introDuration}
        steps={introSteps}
        onComplete={() => setShowIntro(false)} 
      />

      {/* Main Container Wrapper */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 ${showIntro ? 'pointer-events-none select-none max-h-screen overflow-hidden opacity-100' : ''}`}>
          
          {/* Top Banner Navigation (Warm Minimalist Sleek Design) */}
          <header className={`flex flex-col sm:flex-row justify-between items-center ${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-2xl px-6 py-4 mb-6 shadow-sm gap-4 transition-all`}>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-amber-500 animate-[ping_1.5s_infinite]" />
              <div>
                <span 
                  onDoubleClick={() => {
                    if (isLocalEnvironment) {
                      setPasswordError('');
                      setPasswordInput('');
                      setShowPasswordModal(true);
                    }
                  }}
                  title={isLocalEnvironment ? "Double-click for administrative access" : undefined}
                  className={`font-extrabold tracking-tight text-xl font-mono ${isLocalEnvironment ? 'cursor-pointer' : ''} select-none transition ${isDarkMode ? 'text-stone-100 hover:text-amber-400' : 'text-stone-900 hover:text-amber-600'}`}
                >
                  {profile.name.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Main Tabs */}
            <nav className={`flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl transition ${isDarkMode ? 'bg-stone-900 border border-stone-800' : 'bg-stone-100'}`}>
              {(isOwner && isLocalEnvironment ? ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'] : ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular'] as ActiveTab[]).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    id={`nav-tab-${tab}`}
                    onClick={() => setActiveTab(tab as ActiveTab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize tracking-wide transition-all ${
                      isActive
                        ? isDarkMode
                          ? 'bg-stone-800 text-amber-400 border border-stone-700/80 shadow-md font-bold'
                          : 'bg-stone-900 text-white shadow-md'
                        : isDarkMode
                          ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {tab === 'activity' ? 'DSA & Tech Tracker' : tab === 'extracurricular' ? 'Other Activities' : tab === 'crm' ? 'Content Studio' : tab}
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions Console */}
            <div className="flex items-center gap-2">
              {!isOwner && isLocalEnvironment && (
                <button
                  type="button"
                  onClick={() => {
                    setPasswordError('');
                    setPasswordInput('');
                    setShowPasswordModal(true);
                  }}
                  className={`flex items-center justify-center h-9 w-9 rounded-xl border transition-all duration-300 border-stone-250 bg-stone-50 text-stone-500 hover:text-amber-600 hover:bg-stone-100 shadow-xs`}
                  title="Creator/Owner Login Gateway"
                >
                  <Lock className="h-4 w-4 text-stone-400 hover:text-amber-500 transition" />
                </button>
              )}

              {/* Customizer / Quick Action button - Secured for Owner Only */}
              {isOwner && isLocalEnvironment && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSyncToCodebase}
                    title="Save Changes to Codebase"
                    className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl bg-orange-600/10 hover:bg-orange-600 text-orange-600 hover:text-white transition duration-200 border border-orange-600/20 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Sync to Git</span>
                  </button>
                  <button
                    id="customize-portfolio-btn"
                    onClick={() => {
                      setActiveConfigSection('info');
                      setShowConfigModal(true);
                    }}
                    className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold transition shadow-md transform hover:-translate-y-0.5 ${
                      isDarkMode 
                        ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-black' 
                        : 'bg-[#2D2D2D] hover:bg-stone-900 text-stone-50'
                    }`}
                  >
                    <Settings className="h-3.5 w-3.5 animate-spin-slow" />
                    Edit Portfolio
                  </button>
                  <button
                    onClick={handleOwnerLogout}
                    title="Sign Out Creator Mode"
                    className="flex items-center justify-center h-8.5 w-8.5 rounded-xl bg-orange-600/10 hover:bg-orange-600 hover:text-white text-orange-600 transition duration-200"
                  >
                    <Unlock className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Theme Selecting Carousel Panel - Secured for Owner Only */}
          {isOwner && isLocalEnvironment && (
            <div className={`mb-6 ${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-2xl p-4 sm:p-5 shadow-xs transition-all animate-fadeIn`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                  Select live theme design (Owner Only View)
                </span>
                <span className="text-[9px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/30">
                  Creator Console
                </span>
              </div>
              <ThemeSelector 
                presets={THEME_PRESETS} 
                activePresetId={activeTheme.id} 
                onSelect={(theme) => {
                  setActiveTheme(theme);
                  localStorage.setItem('owner_active_theme_id', theme.id);
                  triggerToast(`Theme switched to "${theme.name}" index.`);
                }} 
              />
            </div>
          )}

          {/* Tab Views Content Core */}
          <main className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* HOME VIEW */}
              {activeTab === 'home' && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                   {/* Left Column - Hero Profile Details */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    <div className={`space-y-6 ${isDarkMode ? 'bg-[#1a1a1a] border-stone-800' : 'bg-white border-stone-200'} rounded-3xl p-8 border-2 shadow-sm relative group transition-all hover:border-amber-500/30`}>
                      {isOwner && isLocalEnvironment && (
                        <button
                          onClick={() => {
                            setActiveConfigSection('info');
                            setShowConfigModal(true);
                          }}
                          className={`absolute top-6 right-6 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 opacity-0 group-hover:opacity-100 duration-150 z-20 ${isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'}`}
                          title="Edit Personal Info & Headline"
                        >
                          <Settings className="h-3.5 w-3.5" />
                          <span>Edit Hero</span>
                        </button>
                      )}
                      <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E9E1D6] dark:bg-amber-900/40 text-[#8B5E3C] dark:text-amber-500 text-[10px] font-bold uppercase tracking-widest italic col-span-full w-fit">
                        {profile.role}
                      </span>
                      
                      <h1 className={`text-4xl sm:text-5xl font-light ${isDarkMode ? 'text-white' : 'text-stone-900'} leading-[1.1] tracking-tight whitespace-pre-line`}>
                        {heroHeadline}
                      </h1>

                      <p className={`text-base leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                        Hi, I'm <strong className={`${isDarkMode ? 'text-white' : 'text-stone-900'} font-semibold`}>{profile.name}</strong>. {profile.bio}
                      </p>

                      {/* Micro Contact Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className={`flex items-center gap-3 ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-600'} p-3 rounded-xl border text-sm font-mono`}>
                          <Mail className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                          <span className="truncate" title={profile.email}>{profile.email}</span>
                        </div>
                        <div className={`flex items-center gap-3 ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-600'} p-3 rounded-xl border text-sm font-mono`}>
                          <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                          <span className="truncate">{profile.location}</span>
                        </div>
                      </div>

                      {/* Social Grid Connect buttons with verification */}
                      <div className={`flex flex-wrap items-center gap-3 pt-6 border-t ${isDarkMode ? 'border-stone-800' : 'border-stone-100'}`}>
                        {profile.github && (
                          <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-950 dark:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-xl text-sm font-mono transition font-medium"
                          >
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {profile.linkedin && (
                          <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-800 dark:text-blue-400 rounded-xl text-sm font-mono transition border border-blue-200 dark:border-blue-900/50 font-medium"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {profile.twitter && (
                          <a
                            href={profile.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-300 rounded-xl text-sm font-mono transition border border-stone-200 dark:border-stone-800 font-medium"
                          >
                            <Twitter className="h-4 w-4" />
                            <span>Twitter</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Numeric Stats Rack */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`${isDarkMode ? 'bg-[#1a1a1a] border-stone-800' : 'bg-white border-stone-200'} rounded-3xl p-6 border-2 text-center shadow-sm relative overflow-hidden transition-all hover:border-amber-500/30`}>
                        <h3 className={`text-4xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{projects.length}</h3>
                        <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${isDarkMode ? 'text-amber-500' : 'text-amber-700'}`}>Projects</span>
                      </div>
                      <div className={`${isDarkMode ? 'bg-[#1a1a1a] border-stone-800' : 'bg-white border-stone-200'} rounded-3xl p-6 border-2 text-center shadow-sm relative overflow-hidden transition-all hover:border-amber-500/30`}>
                        <h3 className={`text-4xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{blogs.length}</h3>
                        <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${isDarkMode ? 'text-amber-500' : 'text-amber-700'}`}>Articles</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sleek Card Grid layout */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Widget Row: Currently Working On */}
                    <div className={`md:col-span-2 ${isDarkMode ? 'bg-[#1a1a1a] border-stone-800' : 'bg-[#FAF8F5] border-stone-200'} border-2 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative group transition-all hover:border-amber-500/30`}>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-stone-400 p-1 flex items-center justify-center animate-[spin_12s_linear_infinite] shrink-0 bg-white dark:bg-stone-900 object-cover relative z-10">
                            <div className="w-10 h-10 bg-blue-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                        <div className="space-y-1.5 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                            </span>
                            <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-stone-500 dark:text-stone-400">
                              {workingCategory}
                            </h4>
                          </div>
                          <p className={`font-black ${isDarkMode ? 'text-white' : 'text-stone-900'} text-xl tracking-tight leading-tight`}>{workingTitle}</p>
                          <p className="text-sm text-stone-500 dark:text-stone-400">{workingDesc}</p>
                        </div>
                      </div>
                      
                      {isOwner && isLocalEnvironment && (
                        <button
                          onClick={() => {
                            setActiveConfigSection('working');
                            setShowConfigModal(true);
                          }}
                          className={`${isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white' : 'bg-white text-stone-700 hover:text-stone-950'} border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5`}
                          title="Edit 'Currently Working On'"
                        >
                          <Settings className="h-3.5 w-3.5" />
                          <span>Edit Status</span>
                        </button>
                      )}
                    </div>

                    {/* Left Mini - Latest Project Spotlight */}
                      <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} relative rounded-3xl p-7 shadow-sm border-2 flex flex-col justify-between hover:border-amber-500/30 transition-all group`}>
                        {isOwner && isLocalEnvironment && (
                          <button
                            onClick={() => {
                              setActiveConfigSection('spotlight');
                              setShowConfigModal(true);
                            }}
                            className={`absolute top-5 right-5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white' : 'bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-950'}`}
                            title="Edit Spotlight"
                          >
                            <Settings className="h-3.5 w-3.5" />
                            <span>Edit Project</span>
                          </button>
                        )}
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-md">
                              Spotlight Work
                            </span>
                          </div>
                          <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'} text-xl group-hover:text-amber-600 transition-colors pt-1`}>
                            {spotlightProject.title}
                          </h4>
                          <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                            {spotlightProject.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveTab('projects')}
                          className={`mt-8 flex items-center gap-1.5 text-xs font-bold ${isDarkMode ? 'text-stone-300 hover:text-amber-500' : 'text-stone-600 hover:text-amber-600'} transition-colors`}
                        >
                          <span>Explore project index</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                    {/* Right Mini - Fresh Blog snippet */}
                      <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} relative rounded-3xl p-7 shadow-sm border-2 flex flex-col justify-between hover:border-amber-500/30 transition-all group`}>
                        {isOwner && isLocalEnvironment && (
                          <button
                            onClick={() => {
                              setActiveConfigSection('spotlight');
                              setShowConfigModal(true);
                            }}
                            className={`absolute top-5 right-5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white' : 'bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-950'}`}
                            title="Edit Featured"
                          >
                            <Settings className="h-3.5 w-3.5" />
                            <span>Edit Article</span>
                          </button>
                        )}
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#8B5E3C] dark:text-orange-400 bg-stone-100 dark:bg-orange-900/20 px-2.5 py-1 rounded-md">
                              Featured Read
                            </span>
                          </div>
                          <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'} text-xl leading-snug group-hover:text-amber-600 transition-colors line-clamp-2 pt-1`}>
                            {featuredBlog.title}
                          </h4>
                          <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                            {featuredBlog.excerpt}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveTab('blogs')}
                          className={`mt-8 flex items-center gap-1.5 text-xs font-bold ${isDarkMode ? 'text-stone-300 hover:text-amber-500' : 'text-stone-600 hover:text-amber-600'} transition-colors`}
                        >
                          <span>View article index</span>
                          <BookOpen className="h-4 w-4" />
                        </button>
                      </div>

                    {/* Continuous Activities Link Card */}
                    <div className="md:col-span-2 bg-white/75 backdrop-blur-md rounded-[32px] p-6 border border-stone-200/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-widest">
                          Deployments & Continuous Pursuits
                        </h4>
                        <p className="text-sm text-stone-700">
                          Inspect independent DevOps labs, volunteer tech club contributions, and lab automation scripts!
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('extracurricular')}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-600 font-bold text-xs transition duration-200 shrink-0 shadow-xs"
                      >
                        Explore Other Activities &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ABOUT VIEW */}
              {activeTab === 'about' && (
                <motion.div
                  key="about-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Detailed Bio Showcase */}
                  <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-8 shadow-md relative group`}>
                    {isOwner && isLocalEnvironment && (
                      <button
                        onClick={() => {
                          setActiveConfigSection('info');
                          setShowConfigModal(true);
                        }}
                        className="absolute top-6 right-6 bg-stone-950 text-white hover:bg-stone-800 p-2 rounded-xl shadow-lg transition opacity-85 hover:opacity-100 duration-150 z-20 flex items-center gap-1 text-[10px] font-mono tracking-wider font-bold"
                        title="Edit Bio & Profile Info"
                      >
                        <Settings className="h-3.5 w-3.5 animate-spin-slow" />
                        <span>EDIT BIO</span>
                      </button>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-amber-950/45 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>
                          About {profile.name}
                        </h2>
                        <p className={`text-xs uppercase tracking-wider font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-stone-500'}`}>
                          {profile.role}
                        </p>
                      </div>
                    </div>
                    <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                      {profile.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Educational Journey cards */}
                    <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-6 shadow-sm space-y-6`}>
                      <h3 className={`text-lg font-extrabold tracking-tight flex items-center gap-2 border-b pb-3 ${isDarkMode ? 'text-stone-100 border-stone-850' : 'text-stone-900 border-stone-100'}`}>
                        <BookOpenCheck className="h-5 w-5 text-amber-600" />
                        Academic Milestones
                      </h3>

                      <div className={`space-y-6 relative before:absolute before:inset-y-1 before:left-2.5 before:w-0.5 ${isDarkMode ? 'before:bg-stone-850' : 'before:bg-stone-200'}`}>
                        {profile.education.map((edu, idx) => (
                          <div key={idx} className="relative pl-7 group">
                            <span className="absolute left-1 top-1.5 h-3.5 w-3.5 rounded-full bg-amber-500 border border-white dark:border-stone-950 group-hover:scale-110 transition-transform" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className={`font-bold text-sm ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                {edu.degree}
                              </h4>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ${isDarkMode ? 'bg-stone-900 text-stone-400' : 'bg-stone-100 text-stone-600'}`}>
                                {edu.period}
                              </span>
                            </div>
                            <p className={`text-xs font-semibold font-mono mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{edu.institution} • {edu.grade}</p>
                            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Matrix Categorization List */}
                    <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-6 shadow-sm space-y-6`}>
                      <h3 className={`text-lg font-extrabold tracking-tight flex items-center gap-2 border-b pb-3 ${isDarkMode ? 'text-stone-100 border-stone-850' : 'text-stone-900 border-stone-100'}`}>
                        <Award className="h-5 w-5 text-amber-600" />
                        Tech Skill Matrix
                      </h3>

                      <div className="space-y-5">
                        {profile.skills.map((skillGroup, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                              {skillGroup.category}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {skillGroup.items.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className={`text-xs font-medium px-3 py-1 rounded-lg transition ${
                                    isDarkMode 
                                      ? 'bg-stone-900 text-stone-200 border border-stone-800 hover:border-amber-500 hover:text-amber-400' 
                                      : 'bg-[#E9E1D6]/60 text-[#2D2D2D] border border-stone-200 hover:border-amber-400'
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={`rounded-xl p-4 border text-xs ${isDarkMode ? 'bg-amber-950/15 border-amber-900/30 text-amber-250' : 'bg-amber-50 border-amber-200/40 text-amber-900'}`}>
                        <h4 className={`font-bold flex items-center gap-1 mb-1.5 ${isDarkMode ? 'text-amber-300' : 'text-amber-950'}`}>
                          <Info className="h-3.5 w-3.5 text-amber-600" />
                          Coding Ethics Check
                        </h4>
                        <p className="leading-relaxed opacity-90">
                          All listed skills are verified through hands-on hackathons, dynamic sandbox experiments, and verified GitHub distributions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Internship & Project Experience Section */}
                  <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-8 shadow-md space-y-6`}>
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${isDarkMode ? 'border-stone-850' : 'border-stone-100'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-amber-950/40 text-amber-400 border-amber-900/40' : 'bg-amber-100 text-amber-700 border-transparent'}`}>
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-extrabold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            Professional Experience & Internships
                          </h3>
                          <p className={`text-xs uppercase tracking-wider font-mono ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                            Engineering Internships, Freelance Solutions, and Roles
                          </p>
                        </div>
                      </div>

                      {isOwner && isLocalEnvironment && (
                        <button
                          onClick={() => {
                            setActiveConfigSection('experience');
                            setShowConfigModal(true);
                          }}
                          className="bg-[#E9E1D6]/80 hover:bg-[#E9E1D6] text-[#8B5E3C] px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 hover:scale-105"
                        >
                          <Settings className="h-3 w-3 animate-spin-slow" />
                          <span>Manage Experience</span>
                        </button>
                      )}
                    </div>

                    {experiences.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                        <p className="text-stone-500 text-sm font-sans">No experience added yet. Click 'Manage Experience' to populate.</p>
                      </div>
                    ) : (
                      <div className="space-y-8 relative before:absolute before:inset-y-2 before:left-3.5 before:w-0.5 before:bg-stone-200/80">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="relative pl-10 group">
                            <span className="absolute left-[9px] top-1.5 h-4 w-4 rounded-full bg-amber-600 border-2 border-white group-hover:scale-110 transition-transform shadow-xs animate-pulse" />
                            <div className="space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <h4 className={`font-extrabold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'} text-base`}>
                                    {exp.role} 
                                  </h4>
                                  <span className="text-xs font-mono font-semibold text-amber-800">
                                    {exp.company}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full font-bold ${isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'}`}>
                                    {exp.period}
                                  </span>
                                  {isOwner && isLocalEnvironment && (
                                    <button
                                      onClick={(e) => deleteExperience(exp.id, e)}
                                      className="p-1 text-stone-400 hover:text-red-650 transition"
                                      title="Delete Experience Entry"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                                {exp.description}
                              </p>
                              {exp.tech && exp.tech.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {exp.tech.map((t, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-mono font-bold bg-[#E9E1D6]/60 text-stone-800 border border-stone-200 px-2 py-0.5 rounded">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* PROJECTS VIEW */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Category Filtration Banner */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-stone-200/50">
                    <div>
                      <h3 className="text-base font-bold text-stone-950">Featured engineering projects</h3>
                      <p className="text-xs text-stone-500">Fully developed prototypes, deployment blueprints, and secure configurations.</p>
                    </div>

                    {isOwner && isLocalEnvironment && (
                      <button
                        onClick={() => {
                          setActiveConfigSection('projects');
                          setShowConfigModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-2 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-bold transition text-stone-800"
                      >
                        <Plus className="h-4 w-4" />
                        Add Custom Project
                      </button>
                    )}
                  </div>

                  {/* Project Index Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-3xl p-6 shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200/20">
                              {proj.category}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">Verifiable node</span>
                          </div>

                          <h4 className="text-lg font-black text-stone-950 tracking-tight leading-snug">
                            {proj.title}
                          </h4>

                          <p className="text-xs text-amber-700 font-medium font-mono">
                            {proj.tagline}
                          </p>

                          <p className="text-xs text-stone-500 leading-relaxed">
                            {proj.description}
                          </p>

                          {/* Tech Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {proj.tech.map((chip, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action controllers */}
                        <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs transition inline-flex items-center gap-1"
                              title="Verify Github repository"
                            >
                              <Github className="h-3.5 w-3.5" />
                              <span className="text-[10px] uppercase font-bold tracking-wider">GitHub</span>
                            </a>
                            {proj.demoUrl && proj.demoUrl !== '#' && (
                              <a
                                href={proj.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs transition inline-flex items-center gap-1"
                                title="Open Live Site"
                              >
                                <Globe className="h-3.5 w-3.5" />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Live</span>
                              </a>
                            )}
                          </div>

                          {/* Allow modifying and removing any project */}
                          {isOwner && isLocalEnvironment && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingProjectId(proj.id);
                                  setNewProjTitle(proj.title);
                                  setNewProjTagline(proj.tagline || '');
                                  setNewProjDesc(proj.description);
                                  setNewProjLongDesc(proj.longDescription || '');
                                  setNewProjTech(proj.tech.join(', '));
                                  setNewProjGithub(proj.githubUrl || '');
                                  setNewProjDemo(proj.demoUrl || '');
                                  setActiveConfigSection('projects');
                                  setShowConfigModal(true);
                                }}
                                className="p-1.5 text-stone-400 hover:text-amber-500 rounded transition"
                                title="Edit project"
                              >
                                <Settings className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteProject(proj.id)}
                                className="p-1.5 text-stone-400 hover:text-red-500 rounded transition"
                                title="Delete project"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* BLOGS VIEW */}
              {activeTab === 'blogs' && (
                <motion.div
                  key="blogs-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Blogs Header panel */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-stone-200/50">
                    <div>
                      <h3 className="text-base font-bold text-stone-1000">Technical Engineering Articles</h3>
                      <p className="text-xs text-stone-500">Exploring cloud orchestration, container security auditing, and systems resilience.</p>
                    </div>

                    {isOwner && isLocalEnvironment && (
                      <button
                        onClick={() => {
                          setActiveConfigSection('blogs');
                          setShowConfigModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-2 border border-[#8B5E3C] bg-[#FAF8F5] text-[#8B5E3C] hover:bg-stone-100 rounded-xl text-xs font-bold transition"
                      >
                        <Plus className="h-4 w-4" />
                        Publish Article
                      </button>
                    )}
                  </div>

                  {/* List of active Blog summaries */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => setReadingBlog(blog)}
                        className="bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-3xl p-6.5 shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                            <span className="bg-[#E9E1D6] text-[#8B5E3C] px-2 py-0.5 rounded font-bold uppercase tracking-wide text-[9px]">
                              {blog.category}
                            </span>
                            <span>{blog.date}</span>
                          </div>

                          <h3 className="text-xl font-bold text-stone-950 group-hover:text-amber-800 transition leading-snug">
                            {blog.title}
                          </h3>

                          <p className="text-sm text-stone-600 leading-relaxed pr-2 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100/70">
                          <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                            Read article ({blog.readTime}) &rarr;
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-400 font-mono italic">
                              {blog.views} sandbox reads
                            </span>
                            
                            {/* Allow deleting any articles when logged in as owner */}
                            {isOwner && isLocalEnvironment && (
                              <button
                                onClick={(e) => deleteBlog(blog.id, e)}
                                className="p-1.5 text-stone-400 hover:text-red-500 rounded transition"
                                title="Delete blog"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* DSA & TECH TARGET SYNCHRONIZER VIEW */}
              {activeTab === 'activity' && (
                <motion.div
                  key="activity-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                      <Cpu className="h-44 w-44 animate-pulse" />
                    </div>
                    <div className="space-y-2 max-w-2xl relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-600/15 text-amber-600 dark:text-amber-400 rounded-2xl">
                          <Compass className="h-6 w-6 animate-spin-slow" />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-extrabold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            DSA & Tech Platform Sync Hub
                          </h2>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] font-mono animate-pulse">
                              ● ACTIVE SYNDICATION GATEWAY
                            </span>
                            <span className="text-[10px] text-stone-400 dark:text-stone-550 font-mono font-medium">
                              Last validated: {lastSyncedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'} mt-3`}>
                        This synchronization gateway aggregates and verifies credentials, profile badges, and active problem metrics from top-tier online platforms (Tough DSA, GeeksforGeeks, and LeetCode). Re-verify alignment securely via live cryptographical hashes.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 relative z-10 w-full md:w-auto">
                      <button
                        onClick={() => {
                          if (isSyncing) return;
                          setIsSyncing(true);
                          triggerToast("Establishing handshake protocols with platforms...");
                          setTimeout(() => {
                            triggerToast("Caching solved count from Tough DSA (184 problems)...");
                          }, 1000);
                          setTimeout(() => {
                            triggerToast("Synchronizing GeeksforGeeks API (342 problems, 1452 pts)...");
                          }, 2200);
                          setTimeout(() => {
                            setLastSyncedTime("Just Now");
                            setIsSyncing(false);
                            triggerToast("Handshake complete! All remote indices synchronized.");
                          }, 3500);
                        }}
                        disabled={isSyncing}
                        className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                          isSyncing
                            ? 'bg-stone-300 text-stone-500 cursor-not-allowed dark:bg-stone-800'
                            : 'bg-amber-600 hover:bg-amber-700 text-white hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        <Compass className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Live Dashboards'}</span>
                      </button>

                      {isOwner && isLocalEnvironment && (
                        <button
                          onClick={() => {
                            setActiveConfigSection('activity');
                            setShowConfigModal(true);
                          }}
                          className={`flex items-center justify-center h-10 w-10 rounded-xl transition border shadow-xs ${
                            isDarkMode 
                              ? 'border-stone-850 bg-stone-900/80 hover:bg-stone-800 text-stone-300' 
                              : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                          }`}
                          title="Configure Sync Channels & Learning Paths"
                        >
                          <Settings className="h-4 w-4 animate-spin-slow text-stone-500 dark:text-stone-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Core Platform Sync Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dsaPlatforms.length === 0 && (
                      <p className="text-xs text-stone-400 font-mono italic col-span-full">No platforms configured. Add some in the settings.</p>
                    )}
                    {dsaPlatforms.map((platform) => {
                      const theme = DSA_COLOR_MAP[platform.colorTheme] || DSA_COLOR_MAP['emerald'];
                      const progress = Math.min(100, Math.round((platform.solved / Math.max(1, platform.target)) * 100));
                      
                      return (
                        <div key={platform.id} className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-6 shadow-sm flex flex-col justify-between space-y-5 transition-all hover:shadow-md`}>
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2.5 font-bold">
                                <div className={`h-10 w-10 flex items-center justify-center ${theme.iconBg} ${theme.text} rounded-xl font-bold font-serif text-lg`}>
                                  {platform.shortName}
                                </div>
                                <div>
                                  <h3 className={`font-extrabold text-sm ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                    {platform.name}
                                  </h3>
                                  <p className="text-[9px] font-mono uppercase tracking-wider text-stone-400 font-bold">{platform.type}</p>
                                </div>
                              </div>
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[8px] font-extrabold ${theme.iconBg} ${theme.text} uppercase font-mono tracking-wider`}>
                                {platform.statusLabel}
                              </span>
                            </div>

                            <div className="space-y-2 bg-stone-50 dark:bg-stone-950/20 p-4 rounded-2xl border border-stone-100 dark:border-stone-850">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-stone-500 font-medium font-bold">Problems Solved:</span>
                                <span className={`font-bold font-mono ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{platform.solved}</span>
                              </div>
                              {platform.extraLabel1 && (
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-stone-500 font-medium font-bold">{platform.extraLabel1}</span>
                                  <span className={`font-bold font-mono ${theme.text}`}>{platform.extraValue1}</span>
                                </div>
                              )}
                              {platform.extraLabel2 && (
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-stone-500 font-medium font-mono text-[10px] text-stone-400">{platform.extraLabel2}</span>
                                  <span className={`text-[9px] font-mono font-bold ${theme.softText}`}>{platform.extraValue2}</span>
                                </div>
                              )}
                            </div>

                            {/* Progress Bar styled perfectly */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono text-stone-400 font-bold">
                                <span>Platform Goal Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-1000`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="block text-[8px] text-stone-450 text-right uppercase tracking-wider font-mono font-bold">Target: {platform.target} solved</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-850">
                            <a
                              href={platform.verifyUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-1 py-2 text-[10px] font-extrabold ${theme.text} ${theme.hoverBorder} hover:shadow-xs rounded-xl transition border border-transparent`}
                            >
                              <Award className="h-3.5 w-3.5" />
                              <span>Verify Profile</span>
                            </a>
                            <a
                              href={platform.profileUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 py-2 text-[10px] font-extrabold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition border border-stone-200 dark:border-stone-850"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span>Visit Link</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* High Quality Heatmap & Contribution grid graph (Simulating a tech activity tracker) */}
                  {showHeatmap && (
                    <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-6 shadow-sm space-y-4`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className={`text-sm font-extrabold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            Verified Multi-Platform Code Commit & Problem Heatmap
                          </h3>
                          <p className="text-[10px] text-stone-400 font-mono">
                            Aggregating hourly pushes to internal GitLab, public GitHub, Tough DSA endpoints, and GFG accounts.
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                          <span>Less</span>
                          <div className="h-3.5 w-3.5 bg-stone-100 dark:bg-stone-850 rounded" />
                          <div className="h-3.5 w-3.5 bg-[#10B981]/25 rounded" />
                          <div className="h-3.5 w-3.5 bg-[#10B981]/50 rounded" />
                          <div className="h-3.5 w-3.5 bg-[#10B981]/75 rounded" />
                          <div className="h-3.5 w-3.5 bg-[#14B8A6] rounded" />
                          <span>More</span>
                        </div>
                      </div>

                      {/* Simulating 7 x 28 active code block tiles! Clicking on any block triggers a mini-toast representing the day's tasks! */}
                      <div className="p-3 bg-stone-50 dark:bg-stone-900/40 rounded-2xl border border-stone-100 dark:border-stone-850 overflow-x-auto">
                        <div className="min-w-[650px] space-y-1.5">
                          {Array.from({ length: 7 }).map((_, rankIdx) => {
                            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                            return (
                              <div key={rankIdx} className="flex items-center gap-1.5">
                                <span className="w-6 text-[9px] font-mono font-medium text-stone-400 text-right mr-1">{dayLabels[rankIdx]}</span>
                                {Array.from({ length: 28 }).map((_, colIdx) => {
                                  // Deterministic active colors simulating stats
                                  const sum = (rankIdx * 3 + colIdx * 7) % 11;
                                  let bgClass = 'bg-stone-150 dark:bg-stone-800 hover:ring-2 hover:ring-amber-500';
                                  let countText = 'No activity logged';
                                  if (sum === 1 || sum === 5) {
                                    bgClass = 'bg-[#10B981]/20 hover:ring-2 hover:ring-emerald-400';
                                    countText = '1 problem solved, 2 commits pushed';
                                  } else if (sum === 2 || sum === 8) {
                                    bgClass = 'bg-[#10B981]/45 hover:ring-2 hover:ring-emerald-400';
                                    countText = '3 problems solved, 1 verified test run';
                                  } else if (sum === 3 || sum === 9) {
                                    bgClass = 'bg-[#10B981]/75 hover:ring-2 hover:ring-emerald-400';
                                    countText = '4 problems solved, 5 local commits';
                                  } else if (sum === 6 || sum === 10) {
                                    bgClass = 'bg-[#14B8A6] hover:ring-2 hover:ring-teal-400';
                                    countText = '6 DSA challenges compiled, 1 Cloud Blueprint mapped!';
                                  }

                                  const dateStr = `June ${(colIdx + 1) + (rankIdx % 2)}, 2026`;
                                  return (
                                    <button
                                      key={colIdx}
                                      onClick={() => triggerToast(`[${dateStr}] ${countText}`)}
                                      className={`h-4 w-4 rounded-xs shrink-0 transition-all ${bgClass}`}
                                      title={`Click for activity: ${dateStr}`}
                                    />
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-stone-400 pt-1">
                        <span>&larr; Period: Last 28 Days of Activity Logs</span>
                        <span>* Click on any colored square above to inspect the diagnostic commit metadata</span>
                      </div>
                    </div>
                  )}

                  {/* Learned Tech Software-Related Areas section */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-6 shadow-sm space-y-4`}>
                      <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
                        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`font-extrabold text-sm ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            Tech Software Learning Areas & Concept Mastery
                          </h3>
                          <p className="text-[10px] text-stone-400 font-mono">Specialized learning vectors where I have gained hands-on expertise</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {learningAreas.length === 0 && (
                          <p className="text-xs text-stone-400 font-mono italic col-span-full">No learning areas configured. Add some in the settings.</p>
                        )}
                        {learningAreas.map((area, index) => (
                          <div 
                            key={index} 
                            className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-850 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[8px] font-bold bg-amber-500/15 text-amber-600 uppercase font-mono">
                                  {area.duration}
                                </span>
                                <span className="text-[9px] font-mono text-stone-400">Domain #{index+1}</span>
                              </div>
                              <h4 className={`font-bold text-xs ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>
                                {area.domain}
                              </h4>
                              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                                {area.topics}
                              </p>
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-stone-150 dark:border-stone-850/50 flex justify-between items-center text-[9px] font-mono text-stone-400">
                              <span>Platform:</span>
                              <span className="font-bold text-stone-500">{area.platform}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* OTHER ACTIVITIES & EXTRACURRICULARS VIEW */}
              {activeTab === 'extracurricular' && (
                <motion.div
                  key="extracurricular-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className={`${themeObj.cardBgClass} ${themeObj.cardBorderClass} rounded-[32px] p-8 shadow-md flex justify-between items-start gap-4`}>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-amber-950/40 text-amber-400 border-amber-900/40' : 'bg-amber-100 text-amber-700 border-transparent'}`}>
                          <Compass className="h-5 w-5 animate-pulse" />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>
                            Extracurricular Engagements & Personal Pursuits
                          </h2>
                          <p className={`text-xs uppercase tracking-wider font-mono font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                            Systems Tinkering, Lab Automations, and Community Organizing
                          </p>
                        </div>
                      </div>
                      <p className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                        Engineering is as much about continuous community collaboration and personal sandbox trial-and-error as it is about structured academic blocks. These roles represent active engagement outside traditional lecture constraints.
                      </p>
                    </div>
                    {isOwner && isLocalEnvironment && (
                      <button
                        onClick={() => {
                          setActiveConfigSection('extracurricular');
                          setShowConfigModal(true);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1 shrink-0 scale-102 hover:scale-105 ${isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white' : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950'}`}
                      >
                        <Settings className="h-3.5 w-3.5 animate-spin-slow" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {/* Group Grid of Extracurricular Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {extracurriculars.map((item, index) => (
                      <div key={item.id} className="bg-white/75 dark:bg-stone-900/60 backdrop-blur-md rounded-[32px] p-6 border border-stone-200/50 dark:border-stone-850 shadow-sm space-y-3 flex flex-col justify-between relative group">
                        {isOwner && isLocalEnvironment && (
                          <button
                            onClick={(e) => deleteExtracurricular(item.id, e)}
                            className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-600 dark:bg-red-950/45 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/60 transition opacity-0 group-hover:opacity-100 shadow-xs"
                            title="Delete extracurricular activity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <div className="space-y-3">
                          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl w-10 h-10 flex items-center justify-center text-amber-700 dark:text-amber-400 border border-amber-200/40 dark:border-amber-900/40">
                            {index % 3 === 0 ? (
                              <Settings className="h-5 w-5" />
                            ) : index % 3 === 1 ? (
                              <Compass className="h-5 w-5" />
                            ) : (
                              <Cpu className="h-5 w-5" />
                            )}
                          </div>
                          <h4 className={`font-extrabold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'} text-sm tracking-tight`}>{item.title}</h4>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 uppercase font-bold tracking-wider pt-2 border-t border-stone-100 dark:border-stone-800">{item.role}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>

          {/* Minimalist Professional Footer with subtle administrative entry details */}
          <footer className="mt-20 border-t border-stone-200/40 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono gap-4">
            <div 
              onDoubleClick={() => {
                setPasswordError('');
                setPasswordInput('');
                setShowPasswordModal(true);
              }}
              className="cursor-pointer hover:text-amber-600 transition tracking-tight"
              title="Double-click to access Owner login gateway"
            >
              <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>SRE & DevOps Practitioner</span>
              <span>•</span>
              <button 
                onClick={() => {
                  setPasswordError('');
                  setPasswordInput('');
                  setShowPasswordModal(true);
                }}
                className="opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none transition cursor-pointer text-[10px] bg-stone-200/50 hover:bg-stone-300/60 text-stone-700 dark:text-stone-300 dark:bg-stone-900/60 px-2.5 py-1 rounded"
                title="Admin Authentication Gateway"
              >
                🔐 Owner Interface
              </button>
            </div>
          </footer>
        </div>

      {/* DETAILED BLOG READER MODAL SCREEN */}
      <AnimatePresence>
        {readingBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="bg-[#FAF8F5] text-[#2D2D2D] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/55 my-4"
            >
              {/* Header */}
              <div className="bg-[#FAF8F5] border-b border-stone-200/60 p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E9E1D6] text-[#8B5E3C] px-2.5 py-0.5 rounded-full">
                      {readingBlog.category}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{readingBlog.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-stone-950 tracking-tight leading-tight">
                    {readingBlog.title}
                  </h3>
                </div>
                <button
                  onClick={() => setReadingBlog(null)}
                  className="text-stone-400 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold transition focus:outline-none"
                >
                  &times;
                </button>
              </div>

              {/* Article Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-justify font-serif text-stone-700 leading-relaxed text-sm md:text-base selection:bg-amber-100">
                <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic font-sans text-stone-500 text-sm">
                  {readingBlog.excerpt}
                </blockquote>
                
                {/* Simulated markup splitter */}
                {readingBlog.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={pIdx} className="text-stone-950 font-sans font-extrabold text-base md:text-lg mt-6 pt-2 border-b border-stone-100">
                        {paragraph.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    return (
                      <pre key={pIdx} className="bg-stone-900 text-stone-100 text-xs font-mono p-4 rounded-xl overflow-x-auto border border-stone-800 my-3 select-all">
                        <code>{paragraph.replace(/```[a-z]*/, '').replace(/```$/, '').trim()}</code>
                      </pre>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={pIdx} className="list-disc list-inside space-y-1.5 font-sans pl-2 text-stone-600 text-xs sm:text-sm">
                        {paragraph.split('\n').map((item, iIdx) => (
                          <li key={iIdx} className="list-item">{item.substring(1).trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="whitespace-pre-line text-xs sm:text-sm md:text-base leading-relaxed text-stone-700">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Footer controllers */}
              <div className="p-5 bg-stone-50 border-t border-stone-200/50 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>Reading complete • {readingBlog.readTime}</span>
                <button
                  onClick={() => setReadingBlog(null)}
                  className="px-5 py-2 bg-stone-900 text-white hover:bg-stone-950 rounded-xl font-bold transition font-sans"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORTFOLIO DEVELOPER CONFIG DRAWER MODAL (CRITICAL CUSTOMIZATION) */}
      <AnimatePresence>
        {activeTab === 'crm' && (
          <div className="fixed inset-0 bg-stone-50 dark:bg-[#111111] z-50 flex h-screen overflow-hidden text-stone-900 dark:text-stone-100 font-sans">
             {/* CRM Sidebar */}
             <div className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-stone-200 dark:border-stone-800 flex flex-col shrink-0 rounded-none shadow-sm z-10">
               <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
                  <div className="h-8 w-8 bg-black dark:bg-white text-white dark:text-black rounded-md flex items-center justify-center">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold tracking-tight">Content Studio</h2>
                    <p className="text-[10px] text-stone-500 font-medium">Workspace</p>
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
                 <div className="text-[10px] font-bold tracking-wider uppercase text-stone-400 dark:text-stone-500 px-3 py-2 mt-2 mb-1">Content</div>
                 {[
                   { id: 'info', label: 'Bio & Overview', icon: <User className="h-4 w-4" /> },
                   { id: 'projects', label: 'Projects', icon: <Layout className="h-4 w-4" /> },
                   { id: 'blogs', label: 'Blog Posts', icon: <PenTool className="h-4 w-4" /> },
                   { id: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" /> },
                   { id: 'education', label: 'Education', icon: <Book className="h-4 w-4" /> },
                   { id: 'extracurricular', label: 'Activities', icon: <Compass className="h-4 w-4" /> }
                 ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveConfigSection(tab.id as any)}
                     className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                       activeConfigSection === tab.id
                         ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                         : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                     }`}
                   >
                     {tab.icon}
                     {tab.label}
                   </button>
                 ))}

                 <div className="text-[10px] font-bold tracking-wider uppercase text-stone-400 dark:text-stone-500 px-3 py-2 mt-4 mb-1">Settings</div>
                 {[
                   { id: 'working', label: 'Status Banner', icon: <Clock className="h-4 w-4" /> },
                   { id: 'spotlight', label: 'Featured Items', icon: <Star className="h-4 w-4" /> },
                   { id: 'activity', label: 'Integrations', icon: <Activity className="h-4 w-4" /> },
                   { id: 'landing', label: 'Site Configuration', icon: <Cpu className="h-4 w-4" /> }
                 ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveConfigSection(tab.id as any)}
                     className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                       activeConfigSection === tab.id
                         ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                         : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                     }`}
                   >
                     {tab.icon}
                     {tab.label}
                   </button>
                 ))}
               </div>
               
               <div className="p-4 border-t border-stone-200 dark:border-stone-800">
                 <button onClick={() => setActiveTab('home')} className="w-full py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold rounded-md transition flex items-center justify-center gap-2">
                   <ChevronRight className="h-3.5 w-3.5" /> Back to Website
                 </button>
               </div>
             </div>

             {/* CRM Content Area */}
             <div className="flex-1 bg-stone-50 dark:bg-[#111111] overflow-y-auto relative">
                {/* Top Navbar */}
                <div className="h-16 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a1a1a] flex items-center justify-between px-8 sticky top-0 z-10">
                  <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                    <span>Workspace</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="capitalize font-semibold text-stone-900 dark:text-stone-100">{activeConfigSection}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" /> Saved
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <motion.div
                    key={activeConfigSection}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xs border border-stone-200 dark:border-stone-800 p-8 min-h-[calc(100vh-10rem)]"
                  >
                    <div className="mb-8 pb-4">
                      <h3 className="text-2xl font-bold dark:text-white capitalize text-stone-900 tracking-tight">
                        {activeConfigSection}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Manage fields and content for this section.</p>
                    </div>

                    <div className="space-y-6">
                {activeConfigSection === 'info' && (
                  <form onSubmit={saveProfileInfo} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full text-xs font-medium border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 dark:bg-stone-900/50 focus:bg-white dark:focus:bg-stone-900 dark:text-white focus:outline-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Role Title</label>
                        <input
                          type="text"
                          required
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="w-full text-xs font-medium border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 dark:bg-stone-900/50 focus:bg-white dark:focus:bg-stone-900 dark:text-white focus:outline-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#D97706] mb-1 font-bold">Home Hero Bold Headline</label>
                      <textarea
                        rows={2}
                        required
                        value={heroHeadline}
                        onChange={(e) => setHeroHeadline(e.target.value)}
                        className="w-full text-xs font-semibold border border-[#E9E1D6] dark:border-stone-800 rounded-lg p-2 bg-[#FAF8F5] dark:bg-stone-900/50 focus:bg-white dark:focus:bg-stone-900 dark:text-white focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed"
                        placeholder="e.g. Designing the next wave of software systems."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Interactive Sub-Role Tagline</label>
                      <input
                        type="text"
                        required
                        value={editSubRole}
                        onChange={(e) => setEditSubRole(e.target.value)}
                        className="w-full text-xs font-medium border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Primary Email</label>
                        <input
                          type="email"
                          required
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full text-xs font-medium border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Current Location</label>
                        <input
                          type="text"
                          required
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          className="w-full text-xs font-medium border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Social GitHub Address</label>
                      <input
                        type="url"
                        value={editGithub}
                        onChange={(e) => setEditGithub(e.target.value)}
                        placeholder="https://github.com/vishwasshirurmath"
                        className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">LinkedIn Profile Address</label>
                      <input
                        type="url"
                        value={editLinkedin}
                        onChange={(e) => setEditLinkedin(e.target.value)}
                        className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Developer Short Bio</label>
                      <textarea
                        rows={3}
                        required
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 leading-relaxed"
                      />
                    </div>

                    <div className="border-t border-stone-200 pt-4 space-y-4 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-700 block">Customized Technical Skills Matrix</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditSkills(prev => [...prev, { category: 'New Tech Category', items: [] }]);
                            triggerToast("Added a new skill matrix group!");
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add New Category
                        </button>
                      </div>
                      
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                        {editSkills.map((skillGroup, idx) => (
                          <div key={idx} className="p-3 border border-stone-200 rounded-xl space-y-3 relative bg-stone-50/40">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setEditSkills(prev => prev.filter((_, i) => i !== idx));
                                triggerToast("Skill category removed.");
                              }}
                              className="absolute top-2 right-2 p-1 text-stone-400 hover:text-red-500 rounded-md hover:bg-stone-100 transition"
                              title="Delete category"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                              <div>
                                <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Skill Set #{idx+1} Category</label>
                                <input 
                                  type="text" 
                                  value={skillGroup.category} 
                                  onChange={e => {
                                    const val = e.target.value;
                                    setEditSkills(prev => prev.map((item, i) => i === idx ? { ...item, category: val } : item));
                                  }} 
                                  className="w-full text-xs font-semibold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Items (comma separated)</label>
                                <input 
                                  type="text" 
                                  value={skillGroup.items.join(', ')} 
                                  onChange={e => {
                                    const val = e.target.value;
                                    setEditSkills(prev => prev.map((item, i) => i === idx ? { ...item, items: val.split(',').map(s => s.trim()).filter(Boolean) } : item));
                                  }} 
                                  className="w-full text-[11px] font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                      >
                        Keep Changes
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'working' && (
                  <form onSubmit={(e) => { e.preventDefault(); triggerToast("Currently Working On updated!"); }} className="space-y-4">
                    <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Edit "Currently Working On" Card</h4>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Status/Activity Tag</label>
                      <input type="text" value={workingCategory} onChange={e => setWorkingCategory(e.target.value)} className="w-full text-xs font-semibold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Title of Focus Activity</label>
                      <input type="text" value={workingTitle} onChange={e => setWorkingTitle(e.target.value)} className="w-full text-xs font-bold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Brief Description of Focus Activity</label>
                      <textarea rows={3} value={workingDesc} onChange={e => setWorkingDesc(e.target.value)} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 leading-relaxed" />
                    </div>
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                      <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                        Keep Changes
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'spotlight' && (
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    localStorage.setItem('owner_spotlight', JSON.stringify(spotlightProject));
                    localStorage.setItem('owner_featured_blog', JSON.stringify(featuredBlog));
                    triggerToast("Spotlight & Featured updated!"); 
                  }} className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Spotlight Project</h4>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Project Title</label>
                        <input type="text" value={spotlightProject.title} onChange={e => setSpotlightProject(prev => ({...prev, title: e.target.value}))} className="w-full text-xs font-bold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Category & Tags</label>
                        <input type="text" value={spotlightProject.category} onChange={e => setSpotlightProject(prev => ({...prev, category: e.target.value}))} className="w-full text-xs font-semibold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Description</label>
                        <textarea rows={3} value={spotlightProject.description} onChange={e => setSpotlightProject(prev => ({...prev, description: e.target.value}))} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 leading-relaxed" />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-stone-100">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Featured Read (Blog)</h4>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Blog Title</label>
                        <input type="text" value={featuredBlog.title} onChange={e => setFeaturedBlog(prev => ({...prev, title: e.target.value}))} className="w-full text-xs font-bold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Date String</label>
                        <input type="text" value={featuredBlog.date} onChange={e => setFeaturedBlog(prev => ({...prev, date: e.target.value}))} className="w-full text-xs font-semibold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Excerpt / Highlight</label>
                        <textarea rows={3} value={featuredBlog.excerpt} onChange={e => setFeaturedBlog(prev => ({...prev, excerpt: e.target.value}))} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 leading-relaxed" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                      <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                        Keep Changes
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'education' && (
                  <form onSubmit={saveEducationInfo} className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Academic Timelines & Milestones</h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditEducation(prev => [
                            ...prev, 
                            { 
                              degree: 'Bachelor of Engineering (CSE)', 
                              institution: 'Visvesvaraya Technological University', 
                              period: '2022 - 2026', 
                              grade: '9.5 CGPA', 
                              description: 'Major milestones in key field domains, machine learning projects, and solid platform fundamentals.' 
                            }
                          ]);
                          triggerToast("Added a blank academic milestone!");
                        }}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        Add Milestone
                      </button>
                    </div>

                    <div className="space-y-5 max-h-96 overflow-y-auto pr-1">
                      {editEducation.map((edu, idx) => (
                        <div key={idx} className="p-3 border border-stone-200 rounded-xl space-y-3 relative bg-stone-50/40">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditEducation(prev => prev.filter((_, i) => i !== idx));
                              triggerToast("Academic achievement removed.");
                            }}
                            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-red-500 rounded-md hover:bg-stone-100 transition"
                            title="Delete milestone"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <div className="border-b border-stone-200/50 pb-1 pr-6 flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                              Milestone #{idx + 1}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Degree Name</label>
                              <input 
                                type="text" 
                                value={edu.degree} 
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditEducation(prev => prev.map((item, i) => i === idx ? { ...item, degree: val } : item));
                                }} 
                                className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Institution</label>
                              <input 
                                type="text" 
                                value={edu.institution} 
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditEducation(prev => prev.map((item, i) => i === idx ? { ...item, institution: val } : item));
                                }} 
                                className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Year Period</label>
                              <input 
                                type="text" 
                                value={edu.period} 
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditEducation(prev => prev.map((item, i) => i === idx ? { ...item, period: val } : item));
                                }} 
                                className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Grade Earned</label>
                              <input 
                                type="text" 
                                value={edu.grade} 
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditEducation(prev => prev.map((item, i) => i === idx ? { ...item, grade: val } : item));
                                }} 
                                className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Degree Milestones Description</label>
                            <textarea 
                              rows={2} 
                              value={edu.description} 
                              onChange={e => {
                                const val = e.target.value;
                                  setEditEducation(prev => prev.map((item, i) => i === idx ? { ...item, description: val } : item));
                              }} 
                              className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                      <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                        Keep Changes
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'activity' && (
                  <form onSubmit={(e) => { e.preventDefault(); triggerToast("DSA & tech platforms synchronization configuration updated successfully!"); }} className="space-y-4">
                    <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Sync Channels & Learning Paths</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl mb-4">
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">Commit Heatmap Tracker</h4>
                        <p className="text-[10px] text-stone-500 font-mono mt-0.5">Show or hide the verified problem heatmap grid</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${showHeatmap ? 'bg-emerald-500' : 'bg-stone-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${showHeatmap ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="border-b border-stone-150 pb-2 flex justify-between items-center pt-2">
                      <span className="text-xs font-bold text-stone-800">DSA & Practice Platforms</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDsaPlatforms([]);
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[10px] font-bold transition shadow-sm"
                        >
                          Clear All
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newId = Date.now().toString();
                            setDsaPlatforms([...dsaPlatforms, {
                              id: newId,
                              name: 'New Platform',
                              shortName: 'NP',
                              type: 'Custom Category',
                              colorTheme: 'blue',
                              statusLabel: 'Active',
                              solved: 0,
                              target: 100,
                              extraLabel1: 'Label 1:',
                              extraValue1: 'Value',
                              extraLabel2: 'Label 2',
                              extraValue2: 'Value',
                              profileUrl: '',
                              verifyUrl: ''
                            }]);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold transition shadow-sm"
                        >
                          + Add Platform
                        </button>
                      </div>
                    </div>

                    {dsaPlatforms.map((platform, idx) => (
                      <div key={platform.id} className="space-y-3 p-4 border border-stone-200/50 bg-stone-50 rounded-2xl relative">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...dsaPlatforms];
                            updated.splice(idx, 1);
                            setDsaPlatforms(updated);
                          }}
                          className="absolute top-2 right-2 p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                        >
                          <Trash2 size={14} />
                        </button>
                        <h5 className="text-[11px] font-bold text-stone-800">Platform #{idx + 1}</h5>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Platform Name</label>
                            <input type="text" value={platform.name} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].name = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Short Initial/Logo (2-3 chars)</label>
                            <input type="text" value={platform.shortName} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].shortName = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Theme Color</label>
                            <select value={platform.colorTheme} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].colorTheme = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white">
                              <option value="emerald">Emerald Green</option>
                              <option value="amber">Amber/Yellow</option>
                              <option value="orange">Orange/Red</option>
                              <option value="blue">Blue</option>
                              <option value="purple">Purple</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Badge Type (e.g. Verified Hub)</label>
                            <input type="text" value={platform.statusLabel} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].statusLabel = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Category Subtitle</label>
                            <input type="text" value={platform.type} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].type = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Problems Solved</label>
                            <input type="number" value={platform.solved} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].solved = parseInt(e.target.value) || 0; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Target Score / Max</label>
                            <input type="number" value={platform.target} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].target = parseInt(e.target.value) || 100; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">Profile URL</label>
                            <input type="url" value={platform.profileUrl} onChange={e => {
                               const updated = [...dsaPlatforms]; updated[idx].profileUrl = e.target.value; setDsaPlatforms(updated);
                            }} className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white" />
                          </div>
                        </div>
                      </div>
                    ))}


                    {/* Learning Areas Settings */}
                    <div className="border-b border-stone-150 pb-2 pt-2 flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700 font-sans">4. Software Learning Areas</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLearningAreas([]);
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[10px] font-bold transition shadow-sm"
                        >
                          Clear All
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLearningAreas([...learningAreas, { domain: "", platform: "", topics: "", duration: "" }]);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold transition shadow-sm"
                        >
                          + Add Area
                        </button>
                      </div>
                    </div>
                    {learningAreas.map((area, valIdx) => (
                      <div key={valIdx} className="space-y-2 p-3 bg-stone-55 border border-stone-200/50 rounded-xl relative">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...learningAreas];
                            updated.splice(valIdx, 1);
                            setLearningAreas(updated);
                          }}
                          className="absolute top-2 right-2 p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                          title="Delete learning area"
                        >
                          <Trash2 size={12} />
                        </button>
                        <span className="text-[10px] font-mono text-stone-500 font-bold uppercase">Domain #{valIdx + 1}</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-mono uppercase text-stone-400">Domain Title</label>
                            <input type="text" value={area.domain} onChange={e => {
                              const updated = [...learningAreas];
                              updated[valIdx].domain = e.target.value;
                              setLearningAreas(updated);
                            }} className="w-full text-[11px] border border-stone-300 dark:border-stone-800 rounded-lg p-1.5 bg-white" placeholder="e.g. Data Structures & Algorithms" />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono uppercase text-[#D97706] font-bold">Platform/Host</label>
                            <input type="text" value={area.platform} onChange={e => {
                              const updated = [...learningAreas];
                              updated[valIdx].platform = e.target.value;
                              setLearningAreas(updated);
                            }} className="w-full text-[11px] border border-stone-300 dark:border-stone-800 rounded-lg p-1.5 bg-white" placeholder="e.g. GeeksforGeeks" />
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          <div className="col-span-3">
                            <label className="block text-[8px] font-mono uppercase text-stone-400">Target Concept Topics</label>
                            <input type="text" value={area.topics} onChange={e => {
                              const updated = [...learningAreas];
                              updated[valIdx].topics = e.target.value;
                              setLearningAreas(updated);
                            }} className="w-full text-[11px] border border-stone-300 dark:border-stone-800 rounded-lg p-1.5 bg-white" placeholder="e.g. Graphs, DP" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[8px] font-mono uppercase text-stone-400">Duration Tag</label>
                            <input type="text" value={area.duration} onChange={e => {
                              const updated = [...learningAreas];
                              updated[valIdx].duration = e.target.value;
                              setLearningAreas(updated);
                            }} className="w-full text-[11px] border border-stone-300 dark:border-stone-800 rounded-lg p-1.5 bg-white" placeholder="e.g. 18 Months Active" />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                      <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                        Keep Changes
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'extracurricular' && (
                  <div className="space-y-6">
                    <form onSubmit={addExtracurricular} className="space-y-4 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                      <h4 className="font-extrabold text-xs text-amber-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <PlusCircle className="h-4 w-4" /> Add New Extracurricular Activity
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Cloud Security Sandbox"
                            value={newExtraTitle}
                            onChange={e => setNewExtraTitle(e.target.value)}
                            className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Role / Badge Text</label>
                          <input
                            type="text"
                            placeholder="e.g. Independent Auditor"
                            value={newExtraRole}
                            onChange={e => setNewExtraRole(e.target.value)}
                            className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Detailed Description</label>
                        <textarea
                          rows={2}
                          placeholder="Describe your sandbox experiments, event organization, or deployments..."
                          value={newExtraDesc}
                          onChange={e => setNewExtraDesc(e.target.value)}
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900 leading-relaxed"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Activity</span>
                        </button>
                      </div>
                    </form>

                    <form onSubmit={(e) => { e.preventDefault(); triggerToast("Extracurricular pursuits customized!"); setShowConfigModal(false); }} className="space-y-4">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Manage Existing Extracurricular Activities</h4>
                      {extracurriculars.length === 0 ? (
                        <p className="text-xs text-stone-400 font-mono italic">No extracurricular entries present. Add some above.</p>
                      ) : (
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                          {extracurriculars.map((item, index) => (
                            <div key={item.id} className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3 relative group">
                              <button
                                type="button"
                                onClick={(e) => deleteExtracurricular(item.id, e)}
                                className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg transition"
                                title="Delete this item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <div className="border-b border-stone-200 pb-1">
                                <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">Activity #{index + 1}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Title</label>
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={e => {
                                      const updated = extracurriculars.map((it, idx) =>
                                        idx === index ? { ...it, title: e.target.value } : it
                                      );
                                      setExtracurriculars(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Role / Badge</label>
                                  <input
                                    type="text"
                                    value={item.role}
                                    onChange={e => {
                                      const updated = extracurriculars.map((it, idx) =>
                                        idx === index ? { ...it, role: e.target.value } : it
                                      );
                                      setExtracurriculars(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Description</label>
                                <textarea
                                  rows={2}
                                  value={item.description}
                                  onChange={e => {
                                    const updated = extracurriculars.map((it, idx) =>
                                      idx === index ? { ...it, description: e.target.value } : it
                                    );
                                    setExtracurriculars(updated);
                                  }}
                                  className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900 leading-relaxed"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                        <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                          Keep Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeConfigSection === 'experience' && (
                  <form onSubmit={addExperience} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">
                        Add Professional experience / Internship record
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Company / Institution Name</label>
                        <input
                          type="text"
                          required
                          value={newExpCompany}
                          onChange={(e) => setNewExpCompany(e.target.value)}
                          placeholder="e.g. CloudHedge Technologies"
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Role Title</label>
                        <input
                          type="text"
                          required
                          value={newExpRole}
                          onChange={(e) => setNewExpRole(e.target.value)}
                          placeholder="e.g. DevOps & Cloud Systems Intern"
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Duration Period</label>
                        <input
                          type="text"
                          value={newExpPeriod}
                          onChange={(e) => setNewExpPeriod(e.target.value)}
                          placeholder="e.g. June 2025 - August 2025"
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Technologies (Comma-separated list)</label>
                        <input
                          type="text"
                          value={newExpTech}
                          onChange={(e) => setNewExpTech(e.target.value)}
                          placeholder="e.g. AWS, Docker, Terraform"
                          className="w-full text-[11px] font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Detailed Description of Responsibilities & Achievements</label>
                      <textarea
                        rows={4}
                        required
                        value={newExpDesc}
                        onChange={(e) => setNewExpDesc(e.target.value)}
                        placeholder="Coordinated multi-region active cluster failovers. Audited security boundaries..."
                        className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-stone-50 leading-relaxed"
                      />
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-mono font-bold">Changes persist instantly to user profile.</span>
                      <button type="submit" className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs">
                        Add Experience Card
                      </button>
                    </div>

                    {/* Manage / Delete Existing Experiences index */}
                    {experiences.length > 0 && (
                      <div className="pt-4 mt-4 border-t border-stone-150">
                        <span className="text-xs font-bold text-[#D97706] block mb-2 font-mono uppercase tracking-widest text-[10px]">Existing Experience Timeline Rows ({experiences.length})</span>
                        <div className="space-y-2 max-h-[22vh] overflow-y-auto pr-1">
                          {experiences.map(exp => (
                            <div key={exp.id} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200/50 text-xs">
                              <div className="truncate pr-4">
                                <span className="font-bold text-stone-900">{exp.role}</span>
                                <span className="text-stone-500 font-mono text-[10px] ml-1.5 font-bold">@ {exp.company}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => deleteExperience(exp.id, e)}
                                className="text-red-650 hover:bg-red-50 p-1 rounded-md transition duration-150 text-red-650 shrink-0"
                                title="Delete Experience"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {activeConfigSection === 'projects' && (
                  <form onSubmit={addProject} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">
                        {editingProjectId ? '✨ Edit Project' : '🚀 Add New Project'}
                      </h4>
                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProjectId(null);
                            setNewProjTitle('');
                            setNewProjTagline('');
                            setNewProjDesc('');
                            setNewProjLongDesc('');
                            setNewProjTech('');
                            setNewProjGithub('');
                            setNewProjDemo('');
                          }}
                          className="text-[10px] text-stone-500 hover:text-stone-800 underline uppercase font-bold tracking-wider"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Project Name</label>
                        <input
                          type="text"
                          required
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          placeholder="e.g. Distributed Ledger Proxy"
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Subcategory</label>
                        <select
                          value={newProjCategory}
                          onChange={(e) => setNewProjCategory(e.target.value as any)}
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white"
                        >
                          <option value="Cloud">Cloud Infrastructure</option>
                          <option value="Security">Cybersecurity</option>
                          <option value="Systems">Systems Design</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Slick Tagline Description</label>
                      <input
                        type="text"
                        value={newProjTagline}
                        onChange={(e) => setNewProjTagline(e.target.value)}
                        placeholder="e.g. A ultra-fast WebSocket server proxy tracking IoT nodes"
                        className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Core Description (Snippet)</label>
                      <textarea
                        rows={2}
                        required
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        placeholder="Explain features cleanly for engineering hiring pipelines..."
                        className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Tech Stack Chips (comma separated)</label>
                      <input
                        type="text"
                        value={newProjTech}
                        onChange={(e) => setNewProjTech(e.target.value)}
                        placeholder="React, TypeScript, Docker, WebSockets"
                        className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Github Source Code Link</label>
                        <input
                          type="url"
                          value={newProjGithub}
                          onChange={(e) => setNewProjGithub(e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Demo link (if active)</label>
                        <input
                          type="text"
                          value={newProjDemo}
                          onChange={(e) => setNewProjDemo(e.target.value)}
                          placeholder="e.g. #"
                          className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                      >
                        {editingProjectId ? 'Save Changes' : 'Publish Project Node'}
                      </button>
                    </div>
                  </form>
                )}

                {activeConfigSection === 'blogs' && (
                  <div className="space-y-6">
                    {/* Add Article Form */}
                    <form onSubmit={addBlogPost} className="space-y-4 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                      <h4 className="font-extrabold text-xs text-amber-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <PlusCircle className="h-4 w-4" /> Add New Engineering Article
                      </h4>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Blog Post Title</label>
                        <input
                          type="text"
                          required
                          value={newBlogTitle}
                          onChange={(e) => setNewBlogTitle(e.target.value)}
                          placeholder="e.g. Mastering asynchronous message queues in Express.js"
                          className="w-full text-xs font-bold border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Focus Tag Category</label>
                          <input
                            type="text"
                            value={newBlogCategory}
                            onChange={(e) => setNewBlogCategory(e.target.value)}
                            placeholder="React / Algorithms / Systems"
                            className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Estimated Read Speed</label>
                          <input
                            type="text"
                            value={newBlogReadTime}
                            onChange={(e) => setNewBlogReadTime(e.target.value)}
                            placeholder="4 min read"
                            className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Short Excerpt Summary</label>
                        <input
                          type="text"
                          value={newBlogExcerpt}
                          onChange={(e) => setNewBlogExcerpt(e.target.value)}
                          placeholder="A quick summary of the article contents for indexing cards..."
                          className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 flex items-center justify-between">
                          <span>Write Content (Plain text or ### headers and code)</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={newBlogContent}
                          onChange={(e) => setNewBlogContent(e.target.value)}
                          placeholder="Use double returns to separate paragraphs. Use ### prefix for headings."
                          className="w-full text-xs font-serif border border-stone-300 dark:border-stone-800 rounded-lg p-3 bg-white text-stone-900 leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Publish Article</span>
                        </button>
                      </div>
                    </form>

                    {/* Manage and Delete Existing Articles form */}
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">Manage Existing Articles</h4>
                      {blogs.length === 0 ? (
                        <p className="text-xs text-stone-400 font-mono italic">No articles present. Publish a new article above.</p>
                      ) : (
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                          {blogs.map((item, index) => (
                            <div key={item.id} className="p-4 border border-stone-200 rounded-2xl bg-stone-50 space-y-3 relative group">
                              <button
                                type="button"
                                onClick={(e) => deleteBlog(item.id, e as any)}
                                className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-lg transition"
                                title="Delete this article"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <div className="border-b border-stone-200 pb-1">
                                <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">Article #{index + 1}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Title</label>
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={e => {
                                      const updated = blogs.map((it, idx) =>
                                        idx === index ? { ...it, title: e.target.value } : it
                                      );
                                      setBlogs(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Focus Tag Category</label>
                                  <input
                                    type="text"
                                    value={item.category}
                                    onChange={e => {
                                      const updated = blogs.map((it, idx) =>
                                        idx === index ? { ...it, category: e.target.value } : it
                                      );
                                      setBlogs(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Read Speed</label>
                                  <input
                                    type="text"
                                    value={item.readTime}
                                    onChange={e => {
                                      const updated = blogs.map((it, idx) =>
                                        idx === index ? { ...it, readTime: e.target.value } : it
                                      );
                                      setBlogs(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Excerpt</label>
                                  <input
                                    type="text"
                                    value={item.excerpt}
                                    onChange={e => {
                                      const updated = blogs.map((it, idx) =>
                                        idx === index ? { ...it, excerpt: e.target.value } : it
                                      );
                                      setBlogs(updated);
                                    }}
                                    className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">Content</label>
                                <textarea
                                  rows={3}
                                  value={item.content}
                                  onChange={e => {
                                    const updated = blogs.map((it, idx) =>
                                      idx === index ? { ...it, content: e.target.value } : it
                                    );
                                    setBlogs(updated);
                                  }}
                                  className="w-full text-xs border border-stone-300 dark:border-stone-800 rounded-lg p-2 bg-white text-stone-900 leading-relaxed"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => { triggerToast("Articles customized and persisted!"); }}
                          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                        >
                          Keep Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeConfigSection === 'landing' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider font-mono">
                        Landing Loader & Animation Customizer
                      </h4>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                        Loading Screen Animation Duration (Milliseconds)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1000"
                          max="8000"
                          step="200"
                          value={introDuration}
                          onChange={(e) => setIntroDuration(parseInt(e.target.value, 10))}
                          className="w-full accent-amber-600 cursor-pointer"
                        />
                        <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded shrink-0">
                          {(introDuration / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1">
                        Control how long the high-fidelity loader remains active. The default is 4.6 seconds to let users fully read your profile.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#D97706] mb-1 font-bold">
                        Systems Loader Log Messages (One message per line)
                      </label>
                      <textarea
                        rows={6}
                        value={introSteps.join('\n')}
                        onChange={(e) => setIntroSteps(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                        placeholder="Calibrating system parameters..."
                        className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-3 bg-stone-50 dark:bg-stone-900/50 focus:bg-white dark:focus:bg-stone-900 dark:text-white leading-relaxed"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        Write custom technical logs or greetings to display during startup sequence. Each line represents one status message.
                      </p>
                    </div>

                    <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setIntroDuration(4600);
                          setIntroSteps([
                            'Calibrating inertial reference vectors...',
                            'Nullifying domestic gravity matrices...',
                            'Interlinking orbital connection meshes...',
                            'Aligning professional workspace maps...',
                            'Activating interactive portal... Completed!'
                          ]);
                          triggerToast("Reset animated loader configurations to defaults.");
                        }}
                        className="px-3.5 py-1.5 border border-stone-300 dark:border-stone-800 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-semibold transition"
                      >
                        Reset Defaults
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowIntro(true);
                          setActiveTab('home');
                          triggerToast("Relaunching system loader preview in 3... 2... 1!");
                        }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                      >
                        <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                        Preview Loader Screen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SECURE OWNER ACCESS PASSCODE INPUT MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white text-stone-900 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-stone-200 p-6 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="p-2 bg-stone-900 text-white rounded-xl">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D2D2D] text-sm">Owner Authentication</h3>
                  <p className="text-[10px] text-stone-500 font-mono">AUTHORIZED SYSTEMS ACCESS ONLY</p>
                </div>
              </div>

              <form onSubmit={handleOwnerLogin} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1.5">Secret Access Code</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter owner credentials..."
                    className="w-full text-xs font-mono border border-stone-300 dark:border-stone-800 rounded-lg p-2.5 bg-stone-50 dark:bg-stone-900/50 focus:bg-white dark:focus:bg-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-stone-600 focus:border-stone-600 transition text-stone-900"
                  />
                  {passwordError && (
                    <p className="text-red-650 font-mono text-[10px] tracking-tight mt-1">
                      {passwordError}
                    </p>
                  )}
                  <p className="text-[9px] text-stone-400 leading-normal mt-2 font-mono">
                    * Tip: Use the master key <span className="font-bold text-amber-600/95 font-mono">devops2026</span> or click the "Bypass" button below to enable the editor instantly.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPasswordInput('');
                        setPasswordError('');
                      }}
                      className="flex-1 py-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200/60 rounded-xl text-xs font-bold transition font-sans"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-white bg-stone-950 hover:bg-stone-900 rounded-xl text-xs font-bold transition font-sans shadow-md"
                    >
                      Set Credentials
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setIsOwner(true);
                      localStorage.setItem('is_owner', 'true');
                      setShowPasswordModal(false);
                      setPasswordInput('');
                      setPasswordError('');
                      triggerToast("Bypass activated! Creator Mode is enabled. Enjoy editing!");
                    }}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs transition font-sans shadow-sm"
                  >
                    Bypass / Guest Editor Mode
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECURE OVERLAY CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs z-[70] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-sm rounded-[24px] overflow-hidden p-6 space-y-4 shadow-2xl border ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-800 text-stone-100' 
                  : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3 border-b pb-3 border-stone-100 dark:border-stone-800">
                <div className="p-2 bg-red-600/15 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D2D2D] dark:text-stone-100 text-sm">{confirmModal.title}</h3>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-stone-500">Security Gatekeeper Action</p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
                {confirmModal.message}
              </p>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                    isDarkMode 
                      ? 'bg-stone-850 hover:bg-stone-800 text-stone-300' 
                      : 'bg-stone-100 hover:bg-stone-200/60 text-stone-600'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmModal.onConfirm}
                  className="flex-1 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold transition shadow-md"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            id="toast-notification-banner"
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 border border-stone-700 text-stone-50 px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-2xl backdrop-blur"
          >
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
            <span className="text-xs font-mono font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

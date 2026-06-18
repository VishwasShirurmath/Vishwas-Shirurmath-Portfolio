import { ThemePreset, ProfileInfo, ProjectEntry, BlogPost, ActivityTracker, ExperienceEntry } from './types';

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'sandstone',
    name: 'Warm Sandstone',
    description: 'A cozy, organic blend of soft alabaster, toasted terracotta, and charcoal text.',
    fontClassClass: 'font-sans',
    bgClass: 'bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-stone-900',
    textClass: 'text-stone-800',
    cardBgClass: 'bg-white/80 backdrop-blur-md shadow-sm border border-stone-200/60',
    cardBorderClass: 'border-stone-200/60',
    accentClass: 'bg-amber-600 hover:bg-amber-700 text-white',
    accentTextClass: 'text-amber-700',
    nodeColor: 'rgba(217, 119, 6, 0.45)' // amber-600 with opacity
  },
  {
    id: 'slate',
    name: 'Anti-Gravity Slate',
    description: 'A modern, high-contrast cool tech theme with glassmorphism and radiant teal accents.',
    fontClassClass: 'font-display',
    bgClass: 'bg-slate-50 text-slate-900 selection:bg-cyan-100 selection:text-slate-900',
    textClass: 'text-slate-800',
    cardBgClass: 'bg-white/90 backdrop-blur-lg shadow-md border border-cyan-100/80',
    cardBorderClass: 'border-cyan-100/80',
    accentClass: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    accentTextClass: 'text-cyan-600',
    nodeColor: 'rgba(8, 145, 178, 0.45)' // cyan-600
  },
  {
    id: 'peach',
    name: 'Editorial Peach',
    description: 'A refined literary look focusing on high-end serif typography and warm coral accents.',
    fontClassClass: 'font-serif',
    bgClass: 'bg-orange-50/50 text-stone-900 selection:bg-rose-100 selection:text-stone-900',
    textClass: 'text-stone-800',
    cardBgClass: 'bg-orange-50/90 backdrop-blur-sm shadow-md border border-orange-200/50',
    cardBorderClass: 'border-orange-200/50',
    accentClass: 'bg-rose-500 hover:bg-rose-600 text-white',
    accentTextClass: 'text-rose-500 font-semibold',
    nodeColor: 'rgba(244, 63, 94, 0.45)' // rose-500
  },
  {
    id: 'solar',
    name: 'Solar Minimalist',
    description: 'Crisp layout featuring ultra-fine details, vibrant cadmium-yellow triggers, and high structural safety.',
    fontClassClass: 'font-outfit',
    bgClass: 'bg-white text-zinc-900 selection:bg-amber-100 selection:text-zinc-900',
    textClass: 'text-zinc-800',
    cardBgClass: 'bg-zinc-50/50 backdrop-blur-md border border-zinc-200 shadow-sm',
    cardBorderClass: 'border-zinc-200',
    accentClass: 'bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-medium',
    accentTextClass: 'text-yellow-600 font-bold',
    nodeColor: 'rgba(234, 179, 8, 0.5)' // yellow-500
  },
  {
    id: 'matcha',
    name: 'Matcha Zen',
    description: 'Earthy, peaceful design leveraging sage-green tones and organic soft-circular shapes.',
    fontClassClass: 'font-sans',
    bgClass: 'bg-emerald-50/30 text-emerald-950 selection:bg-emerald-100 selection:text-emerald-950',
    textClass: 'text-emerald-900',
    cardBgClass: 'bg-white/80 backdrop-blur shadow-sm border border-emerald-100/70',
    cardBorderClass: 'border-emerald-100/70',
    accentClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    accentTextClass: 'text-emerald-700',
    nodeColor: 'rgba(5, 150, 105, 0.45)' // emerald-600
  },
  {
    id: 'wheat',
    name: 'Cosmic Wheat',
    description: 'Soft linen-toned background, comfortable contrast ratios, and golden field highlights.',
    fontClassClass: 'font-outfit',
    bgClass: 'bg-yellow-50/20 text-stone-900 selection:bg-amber-100 selection:text-stone-900',
    textClass: 'text-stone-800',
    cardBgClass: 'bg-amber-50/45 backdrop-blur-sm border border-amber-200/40 shadow-sm',
    cardBorderClass: 'border-amber-200/40',
    accentClass: 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-medium',
    accentTextClass: 'text-amber-600',
    nodeColor: 'rgba(217, 119, 6, 0.4)' // amber-500
  }
];


export const INITIAL_PROFILE: ProfileInfo = {
  "name": "Vishwas Shirurmath",
  "role": "Aspiring Software Engineer",
  "subRole": "Aspiring DevSecOps, Cloud & System Design Engineer focused on building secure, scalable, and automated infrastructure. Passionate about cloud-native technologies, cybersecurity, and designing resilient distributed systems.",
  "email": "vishwasshirurmath123@gmail.com",
  "phone": "+91 94827 XXXXX",
  "location": "Mysore, India",
  "github": "https://github.com/vishwasshirurmath",
  "linkedin": "https://www.linkedin.com/in/vishwas-shirurmath",
  "bio": "Driven by curiosity and obsessed with growth, I build secure, scalable, and automated solutions while continuously exploring the latest advancements in cloud, DevOps,System Design and cybersecurity.",
  "skills": [
    {
      "category": "Cloud & Infrastructure",
      "items": [
        "AWS",
        "Cloud Architecture",
        "Virtual Private Cloud (VPC)",
        "EC2",
        "S3",
        "IAM",
        "Cloud Security",
        "Infrastructure as Code (Terraform)"
      ]
    },
    {
      "category": "Backend & Systems Engineering",
      "items": [
        "Python",
        "FastAPI",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "Distributed Systems",
        "Microservices Architecture",
        "System Design"
      ]
    },
    {
      "category": "DevOps Tools",
      "items": [
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
        "GitHub Actions",
        "Terraform",
        "Linux Administration",
        "Bash Scripting",
        "Platform Automation",
        "Prometheus",
        "Grafana",
        "ELK Stack",
        "Log Management",
        "Metrics Monitoring",
        "Alerting Systems",
        "Performance Optimization."
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Engineering in Computer Science & Engineering(Cyber Security and Digital Forensics)",
      "institution": "Vellore Institue of Technology,Bhopal University",
      "period": "2023-2027",
      "grade": "Grade: B",
      "description": ""
    },
    {
      "degree": "Pre-University College (Science & PCMC)",
      "institution": "Sankalpa Pu College",
      "period": "2021 - 2023",
      "grade": "Grade: A",
      "description": ""
    }
  ],
  "resume": "https://vishwasshirurmath.tiiny.site"
};

export const INITIAL_PROJECTS: ProjectEntry[] = [];

export const INITIAL_BLOGS: BlogPost[] = [];

export const INITIAL_TRACKERS: ActivityTracker[] = [
  { id: 'track-1', name: 'LeetCode Problems', category: 'coding', target: 5, current: 2, unit: 'problems solved', color: 'from-amber-400 to-orange-500' },
  { id: 'track-2', name: 'GitHub Commits', category: 'coding', target: 8, current: 4, unit: 'commits made', color: 'from-cyan-400 to-blue-500' },
  { id: 'track-3', name: 'Coding Hours', category: 'coding', target: 6, current: 3, unit: 'hours logged', color: 'from-emerald-400 to-teal-500' },
  { id: 'track-4', name: 'Technical Docs Pages', category: 'learning', target: 20, current: 12, unit: 'pages read', color: 'from-purple-400 to-indigo-500' },
  { id: 'track-5', name: 'Hydration Log', category: 'wellbeing', target: 8, current: 5, unit: 'cups of water', color: 'from-blue-400 to-sky-500' }
];

export const INITIAL_EXPERIENCES: ExperienceEntry[] = [
  {
    "id": "exp-1781809501678",
    "role": "Project Intern",
    "company": "Defense Institute of Advanced Technology (DIAT), DRDO Pune",
    "period": "MAY 2026 - JULY 2026",
    "description": "Architected a decentralized Zero Trust Architecture (ZTA) for tactical edge environments using K3s,\nSPIFFE/SPIRE, Envoy Proxy, and Open Policy Agent (OPA), enabling secure identity-based communication\nand mutual TLS (mTLS) authentication without centralized cloud dependency.\n•\nEngineered a cloud-native observability platform leveraging FastAPI, PostgreSQL, React, Prometheus, and\nGrafana to monitor real-time network telemetry, security events, trust scores, and infrastructure health across\ndistributed environments.\n•\nImplemented policy-driven access control, local authorization caching, and dynamic security enforcement\nmechanisms, eliminating fail-open conditions and improving resilience during network disruptions and\ndisconnected operations.\n•\nContainerized and orchestrated microservices using Docker and Kubernetes, streamlining deployment workflows,\nimproving scalability, and enabling automated infrastructure monitoring and anomaly detection.\nDeveloped real-time threat detection and security monitoring capabilities by integrating telemetry analytics,\npolicy evaluation, and observability pipelines to identify suspicious network behavior and operational risks.",
    "tech": [
      "CLOUD",
      "DEVOPS TOOLS",
      "ZTA(ZERO-TRUST ARCHITECTURE)"
    ]
  }
];

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
  name: "Vishwas Shiroor Mat",
  role: "DevOps & Cloud Systems Engineer",
  subRole: "Specializing in Cloud Infrastructure Orchestration, Resilient Systems Design, and Cybersecurity Hardening",
  email: "vishwasshirurmath123@gmail.com",
  phone: "+91 94827 XXXXX",
  location: "Bengaluru, India",
  github: "https://github.com/vishwasshirurmath",
  linkedin: "https://linkedin.com/in/vishwasshirurmath",
  twitter: "https://twitter.com/vishwass_codes",
  bio: "Highly motivated DevOps, Cloud Systems, and Cybersecurity Associate. Deeply fascinated by high-availability cloud networking, automated CI/CD pipelines, Infrastructure-as-Code (IaC), container security auditing, and resilient systems design. Skilled in Linux systems, Docker, Kubernetes, Terraform, AWS cloud architectures, security compliance frameworks, and network analysis protocols.",
  skills: [
    {
      category: "DevOps & Cloud Engineering",
      items: ["Terraform", "Kubernetes", "Docker Engine", "AWS Services", "Google Cloud", "GitHub Actions CI", "Ansible"]
    },
    {
      category: "Systems & Network Security",
      items: ["Linux Administration", "Bash & Python Scripting", "Nginx Proxies", "Threat Modeling", "Wireshark Network Auditing", "OWASP Security", "eBPF / Falco Audits"]
    },
    {
      category: "Architectural Foundations",
      items: ["CI/CD Automation", "IAM & RBAC Hardening", "Site Reliability", "TCP/IP & Firewalls", "Zero-Trust Design", "Infrastructure Security"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Engineering in Computer Science & Engineering",
      institution: "Visvesvaraya Technological University (VTU)",
      period: "2022 - 2026",
      grade: "CGPA: 8.9 / 10",
      description: "Specialized in Computer Networks, Operating Systems, Systems Programming, Information & Cybersecurity, Distributed Systems, and Database Management. Actively coordinated tech club workshops, designed automated build scripts for department lab environments, and led local hackathons."
    },
    {
      degree: "Pre-University College (Science & PCMC)",
      institution: "State Board Academy",
      period: "2020 - 2022",
      grade: "Grade: 94.6%",
      description: "Focused heavily on Physics, Chemistry, Mathematics, and Computer Science. Built an early foundation in TCP/IP basics, algorithmic problem-solving, and object-oriented C++ architectures."
    }
  ]
};

export const INITIAL_PROJECTS: ProjectEntry[] = [
  {
    id: "proj-1",
    title: "Anti-Gravity Cloud Network Mesh Simulator",
    tagline: "A live browser canvas simulation of high-availability cloud routing nodes and failover events.",
    description: "An interactive visualizer demonstrating VPC traffic flows, reverse proxy distribution, and automated latency-repulsion modeling. Real-time cursor hover acts as a latency stress test, dynamically rerouting network packet particles to safe regions using custom routing path finding algorithms.",
    tech: ["TypeScript", "HTML5 Canvas", "Systems Design", "VPC Routing Logic", "Framer Motion"],
    githubUrl: "https://github.com/vishwasshirurmath/antigravity-network-mesh",
    demoUrl: "#",
    category: "Systems",
    featured: true,
    longDescription: "Engineered to translate complex VPC routing concepts and transit gateway failover states into beautiful browser telemetry. Built with highly optimized canvas rendering. Implements a customized Dijkstra shortest-path pathfinder, mimicking dynamic load distribution across multiple elastic edge zones under artificial latency stress."
  },
  {
    id: "proj-2",
    title: "Zetashield Daemon: Kubernetes Container Runtime Auditor",
    tagline: "High-performance behavioral auditing and anomaly detector for containerized orchestration environments.",
    description: "An lightweight telemetry monitor that analyzes system calls, file integrity breaches, and unauthorized privilege escalation inside pods. Uses sandbox logs to generate real-time containment triggers and isolates namespaces.",
    tech: ["Go", "Docker Security", "Kubernetes DaemonSets", "Linux Administration", "Shell Scripting"],
    githubUrl: "https://github.com/vishwasshirurmath/zetashield-k8s-monitor",
    demoUrl: "#",
    category: "Systems",
    featured: true,
    longDescription: "Developed as a threat monitoring guardrail for Kubernetes environments. Interacts with Linux runtime logs to trace anomalous bash commands or critical system file overrides. Employs highly decoupled asynchronous logging threads to prevent container performance overheads."
  },
  {
    id: "proj-3",
    title: "Multi-Region Secure Landing Zone Blueprints",
    tagline: "Modular Terraform configurations provisioning secure multi-region AWS transit meshes and IAM guardrails.",
    description: "A production-grade collection of IaC scripts declaring secure federated AWS setups. Automates the deployment of regional subnets, NAT gateways, bastions, and zero-trust IAM roles with strict least-privilege policies.",
    text: [],
    tech: ["Terraform", "AWS", "CI/CD Pipelines", "Ansible", "IAM Governance"],
    githubUrl: "https://github.com/vishwasshirurmath/secure-aws-landingzone",
    demoUrl: "#",
    category: "Systems",
    featured: false,
    longDescription: "Fosters rapid infrastructure-as-code velocity by standardizing virtual clouds, edge security rules, and cluster specifications. Highlights secure handling of static secrets using KMS Key Envelopes and automates code checking using tflint, pre-commit git security scanning hooks, and tfsec vulnerabilities auditing."
  }
] as unknown as ProjectEntry[];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Architecting Resilient Services: Navigating Multi-Region Active-Active Cloud Networks",
    excerpt: "Downtime is incredibly expensive. Let's break down DNS failover techniques, cross-region replication latency, and SRE best practices with clear systems-level analogies.",
    content: `When establishing modern cloud systems, the first rule of SRE (Site Reliability Engineering) is: **assume that physical regions can fail**. A lightning strike, a fiber cut, or a bad hypervisor update can instantly paralyze an entire data center.

To build true five-nines systems, we have to design with multi-region failovers and strict network isolation boundaries.

### 1. The DNS Routing Layer
To guide packets cleanly during local outages, we must configure low-TTL traffic routers. Using latency-based routing combined with health probes ensures that if an AP-South edge router fails, connection streams are automatically shifted to neighboring region paths under 60 seconds:
\`\`\`
[USER EDGE] --(DNS Latency Check)--> AWS Route 53
                                      /        \\
                           [AP-SOUTH-1]        [EU-CENTRAL-1]
                            (Healthy)           (Active Proxy)
\`\`\`
By using health check threshold parameters, we can prevent "flapping routes" and isolate dead instances gracefully.

### 2. Micro-Segmentation & Boundary Security
Within each region, your virtual networks (VPCs) should never talk openly. Utilizing Security Groups as high-fidelity system gates ensures that only authorized containers with specific IAM roles can route packets inside the private subnets. This keeps internal data networks secure and reduces the threat surface to a bare minimum.

### Why SRE is critical for DevOps
As aspiring systems and cloud engineers, designing files and configurations and checking they run seamlessly across virtual clouds establishes deep technical discipline. Perfecting automated infrastructure builds turns catastrophic outages into minor, self-healing events.`,
    date: "June 15, 2026",
    readTime: "5 min read",
    category: "Systems Design",
    views: 145
  },
  {
    id: "blog-2",
    title: "Demystifying Zero-Trust Container Auditing with Lightweight Runtime Audits",
    excerpt: "How to merge Kubernetes runtime event hooks with system logging pipelines to detect compromise lines.",
    content: `Kubernetes is remarkably efficient at managing containers, scaling out services, and routing standard HTTP queries. But what happens when a compromised dependency gets executed inside a secure production pod?

If someone runs a malicious command or downloads an external cryptominer binary, basic static image scanners won't help you. You need **Runtime Visibility**.

### The Problem: Node Auditing Tension
Standard log checkers only review container health or basic stdout logs. They don't monitor what happens inside the container kernel. If a shell command is executed directly, standard alerts might miss it.

### The Solution: eBPF System Call Inspection
To build bulletproof containment, we must listen directly to system calls at the Linux kernel level:

1. **Monitor standard system behaviors** (like \`execve\` for command execution and \`connect\` for outbound connections).
2. **Handle detection hooks asynchronously** without adding latency to the running container application.
3. **Draft security posture rules** inside Kubernetes DaemonSets to instantly terminate or isolate violating pods.

Integrating these active checks inside your secure CI/CD build scripts prevents container security drifts, guaranteeing high data confidentiality across multi-tenant clusters.`,
    date: "June 08, 2026",
    readTime: "7 min read",
    category: "Cybersecurity",
    views: 112
  },
  {
    id: "blog-3",
    title: "Infrastructure as Code Secrets Hygiene: Preventing Secret Drifts in Terraform Blueprints",
    excerpt: "A practical guide to KMS envelopes, IAM OIDC roles, and static IaC security analyzers.",
    content: `As cloud engineering practices move rapidly to Declarative Infrastructure-as-code (IaC), there's a major cybersecurity threat: **hardcoded secret tokens during Git commits**.

Leaving database master passwords, SSH private keys, or cloud provider API tokens in raw files is one of the quickest ways to experience a devastating data breach.

### 1. Leverage OIDC Trust over Static Keys
Instead of hardcoding AWS Access Keys inside your GitHub Actions workflows, use OpenID Connect (OIDC). OIDC establishes a short-lived cryptographic trust layer:
- GitHub requests a temporary key from the cloud provider.
- AWS validates the repository signature and issues a token valid for exactly 1 hour.
- No static keys are ever stored on disk or inside Git, completely eliminating credential leak vectors.

### 2. Static Vulnerability Scanning (IaC Audits)
Incorporate automated check gates in your pipelines:
- **tfsec / checkov**: Evaluates your Terraform configurations for open security groups (like \`0.0.0.0/0\` on port 22) or unencrypted S3 storage.
- **git-secrets / gitleaks**: Automatically blocks commits if high-entropy strings or private key formats are detected in the staging files.

Making security checks an active, mandatory part of your automated tooling protects systems continuously before code ever touches production servers.`,
    date: "May 25, 2026",
    readTime: "4 min read",
    category: "DevOps",
    views: 105
  }
];

export const INITIAL_TRACKERS: ActivityTracker[] = [
  { id: 'track-1', name: 'LeetCode Problems', category: 'coding', target: 5, current: 2, unit: 'problems solved', color: 'from-amber-400 to-orange-500' },
  { id: 'track-2', name: 'GitHub Commits', category: 'coding', target: 8, current: 4, unit: 'commits made', color: 'from-cyan-400 to-blue-500' },
  { id: 'track-3', name: 'Coding Hours', category: 'coding', target: 6, current: 3, unit: 'hours logged', color: 'from-emerald-400 to-teal-500' },
  { id: 'track-4', name: 'Technical Docs Pages', category: 'learning', target: 20, current: 12, unit: 'pages read', color: 'from-purple-400 to-indigo-500' },
  { id: 'track-5', name: 'Hydration Log', category: 'wellbeing', target: 8, current: 5, unit: 'cups of water', color: 'from-blue-400 to-sky-500' }
];

export const INITIAL_EXPERIENCES: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "DevOps & Cloud Systems Intern",
    company: "CloudHedge Technologies",
    period: "June 2025 - August 2025",
    description: "Coordinated containerization of legacy Spring Boot APIs, reducing artifact sizes by 40% using multi-stage Alpine Dockerfiles. Designed high-availability AWS ECS task definitions and wrote Terraform modules for secure IAM role isolation. Assisting SREs by configuring Prometheus alerts and automated Slack notifications for critical system health metrics.",
    tech: ["AWS", "Docker", "Terraform", "Kubernetes", "Prometheus", "Git"]
  },
  {
    id: "exp-2",
    role: "Cybersecurity Associate",
    company: "CyberSec Labs",
    period: "January 2025 - May 2025",
    description: "Conducted network traffic auditing using Wireshark and configured Falco deep runtime threat detection on staging clusters. Performed vulnerability assessments using OWASP guidelines, patching security bottlenecks in custom Nginx reverse proxy routing profiles.",
    tech: ["Falco", "Wireshark", "Linux", "Nginx", "OWASP Security"]
  }
];


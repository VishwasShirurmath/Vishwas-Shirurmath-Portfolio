import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. the sticky header
content = content.replace(
  /<header className="([^"]+)">/,
  `<header className="$1 sticky top-4 z-50 backdrop-blur-md shadow-sm">`
);

// 2. update intersection observer in useEffect
let observerCode = `
  // Auto-update active tab based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as ActiveTab);
        }
      });
    }, { threshold: 0.1, rootMargin: "-20% 0px -40% 0px" });

    const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
`;

if (!content.includes('Auto-update active tab')) {
  content = content.replace(
    /(\[profile, projects, blogs.+?isLocalEnvironment\]\);\s*)/,
    `$1\n${observerCode}\n`
  );
}

// 3. modify nav clicks
content = content.replace(
  /onClick=\{\(\) => setActiveTab\(tab as ActiveTab\)\}/g,
  `onClick={() => {
                      document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                    }}`
);

// 4. Wrap with divs instead of conditional returns
content = content.replace(/<AnimatePresence mode="wait">\s*/g, '');
// The matching AnimatePresence on line 1891 needs to be removed.
content = content.replace(/<\/AnimatePresence>\s*\{\/\* CRM /g, '{/* CRM '); // it might be formatted differently, let's just do a specific index search later

const tabsToReplace = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];

for (const tab of tabsToReplace) {
  const regexStart = new RegExp(`\\{activeTab === '${tab}' && \\([\\s\\S]*?<motion\\.div`);
  content = content.replace(regexStart, `<div id="${tab}" className="scroll-mt-32 snap-start relative min-h-[50vh] pt-4"><motion.div`);
}

// 5. Replace terminating tags
content = content.replace(/<\/motion\.div>\s*\}\)/g, '</motion.div>\n              </div>');

// 6. Make main space-y-32
content = content.replace(
  /<main className="space-y-6">/,
  `<main className="space-y-32 pb-40">`
);

// Remove the one AnimatePresence tag that was wrapping the entire main block
content = content.replace(/<\/AnimatePresence>(\s*)(\{activeTab === 'crm' && \()/g, '$1<div id="crm" className="scroll-mt-32 snap-start relative min-h-[50vh]"><motion.div'); 

fs.writeFileSync('src/App.tsx', content);

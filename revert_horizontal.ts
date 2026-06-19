import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The original Vertical Intersection Observer
const observerCode = `
  // Auto-update active tab based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as ActiveTab);
        }
      });
    }, { threshold: 0.2, rootMargin: "-10% 0px -40% 0px" });

    const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
`;

// Replace the observer code
const startIdx = content.indexOf('// Auto-update active tab based on scroll position');
const endIdxStr = '}, []);';
const endIdxOffset = content.indexOf(endIdxStr, startIdx);
if (startIdx !== -1 && endIdxOffset !== -1) {
  const endIdx = endIdxOffset + endIdxStr.length;
  content = content.substring(0, startIdx) + observerCode.trim() + '\n' + content.substring(endIdx);
}

// Revert main className
const m1 = '<main ref={scrollContainerRef} className="flex flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory pt-4 pb-20 [&::-webkit-scrollbar]:hidden w-full flex-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>';
content = content.replace(m1, '<main className="space-y-32 pb-40">');

// Revert section classNames
const sectionsToUpdate = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
for (const section of sectionsToUpdate) {
  const fromStr = '<div id="' + section + '" className="w-full flex-none snap-start relative min-h-[50vh] pr-4 sm:pr-8 pt-4">';
  const toStr   = '<div id="' + section + '" className="scroll-mt-32 snap-start relative min-h-[50vh] pt-4">';
  content = content.replace(fromStr, toStr);
}

// Revert scroll behavior in nav
content = content.replaceAll(
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });",
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });"
);

fs.writeFileSync('src/App.tsx', content);

import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const observerCode = `
  // Auto-update active tab based on scroll position
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Horizontal scroll override
    const handleWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      // If the event target is inside a vertically scrollable element, don't intercept!
      let target = e.target as HTMLElement | null;
      let isVerticalScrollable = false;
      while (target && target !== container) {
        if (target.scrollHeight > target.clientHeight) {
           const style = window.getComputedStyle(target);
           if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
              isVerticalScrollable = true;
              break;
           }
        }
        target = target.parentElement;
      }

      if (!isVerticalScrollable && e.deltaY !== 0 && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollBy({
           left: e.deltaY,
           behavior: 'auto'
        });
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as ActiveTab);
        }
      });
    }, { 
      threshold: 0.5, 
      root: container 
    });

    const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      observer.disconnect();
    };
  }, []);
`;

if (content.includes('// Auto-update active tab based on scroll position')) {
  // It's from "// Auto-update active tab" to "}, []);"
  const startIdx = content.indexOf('// Auto-update active tab based on scroll position');
  const endIdxStr = '}, []);';
  const endIdxOffset = content.indexOf(endIdxStr, startIdx);
  if (startIdx !== -1 && endIdxOffset !== -1) {
    const endIdx = endIdxOffset + endIdxStr.length;
    content = content.substring(0, startIdx) + observerCode + content.substring(endIdx);
  }
}

if (!content.includes('useRef')) {
  content = content.replace(/import React, \\{([\s\S]*?)\\} from 'react';/, "import React, { useRef, $1 } from 'react';");
}

content = content.replace(
  '<main className="space-y-32 pb-40">',
  '<main ref={scrollContainerRef} className="flex flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory pt-4 pb-20 [&::-webkit-scrollbar]:hidden w-full flex-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>'
);

const sectionsToUpdate = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];

for (const section of sectionsToUpdate) {
  content = content.replace(
     '<div id="' + section + '" className="scroll-mt-32 snap-start relative min-h-[50vh] pt-4">',
     '<div id="' + section + '" className="w-full flex-none snap-start relative min-h-[50vh] pr-4 sm:pr-8 pt-4">'
  );
}

content = content.replaceAll(
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });",
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });"
);

fs.writeFileSync('src/App.tsx', content);

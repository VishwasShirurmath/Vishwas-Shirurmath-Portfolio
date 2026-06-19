import fs from 'fs';

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. We replace the main className:
appContent = appContent.replace(
  /<main className="space-y-32 pb-40">/,
  `<main className="flex flex-nowrap w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory pt-4 pb-12 hide-scrollbar relative -ml-4 pl-4 sm:-ml-8 sm:pl-8 pr-4 sm:pr-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} ref={scrollContainerRef}>`
);

// 2. We replace the IntersectionObserver in useEffect:
const NEW_OBSERVER = `
  // Horizontal Scroll and Active Tab Tracking
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Find if we are scrolling inside a vertical element
      let target = e.target as HTMLElement | null;
      let isVerticalScrollable = false;
      while (target && target !== container) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            const isAtTop = target.scrollTop === 0;
            const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 2;
            
            if (e.deltaY > 0 && !isAtBottom) {
               isVerticalScrollable = true;
               break;
            } else if (e.deltaY < 0 && !isAtTop) {
               isVerticalScrollable = true;
               break;
            }
          }
        }
        target = target.parentElement;
      }

      // If we are not inside a scrollable vertical element, translate wheel to horizontal
      if (!isVerticalScrollable && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 3, // Scroll horizontally instead
          behavior: 'smooth'
        });
      }
    };
    
    // Use a passive: false listener to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Use intersection observer to detect active tab
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as ActiveTab);
        }
      });
    }, { threshold: 0.25, root: container });

    const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    };
  }, []);
`;

// Replace old observer
const startObs = appContent.indexOf('// Auto-update active tab based on scroll position');
if (startObs !== -1) {
  const endObsTag = '}, []);';
  const endObs = appContent.indexOf(endObsTag, startObs);
  if (endObs !== -1) {
    appContent = appContent.substring(0, startObs) + NEW_OBSERVER.trim() + '\n' + appContent.substring(endObs + endObsTag.length);
  }
}

// 3. Update sections to be flex-none containers that enable vertical scroll
const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
sections.forEach(id => {
  const regex = new RegExp(`<div id="${id}" className="scroll-mt-32 snap-start relative min-h-\\[50vh\\] pt-4">`);
  appContent = appContent.replace(regex, `<div id="${id}" className="w-[100vw] sm:w-[calc(100vw-6rem)] max-w-7xl flex-none snap-center relative h-[calc(100vh-140px)] pr-4 sm:pr-8 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-thumb]:bg-stone-700 [&::-webkit-scrollbar-thumb]:rounded-full pt-2">`);
});

// 4. Update the navbar scroll behavior
appContent = appContent.replaceAll(
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });",
  "document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });"
);

// 5. Add custom hide-scrollbar class and ensure body is overflow-hidden so the whole page doesn't scroll vertically!
appContent = appContent.replace(
  /<div className="\`min-h-screen font-sans transition-colors duration-300/,
  `<div className={\`min-h-screen h-screen overflow-hidden font-sans transition-colors duration-300`
);
appContent = appContent.replace(
  /<div className="min-h-screen font-sans transition-colors duration-300/,
  `<div className="min-h-screen h-screen overflow-hidden font-sans transition-colors duration-300`
);

fs.writeFileSync('src/App.tsx', appContent);

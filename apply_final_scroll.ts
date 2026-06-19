import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Root container should be 100vh and handle NO scrolling natively
content = content.replace(
  /<div className=\{\`min-h-screen relative transition-colors duration-700 overflow-x-hidden \$\{themeObj\.bgClass\} \$\{themeObj\.fontClassClass\}\`\}>/,
  `<div className={\`h-screen relative transition-colors duration-700 overflow-hidden \${themeObj.bgClass} \${themeObj.fontClassClass}\`}>`
);

// 2. Wrap main container with fixed height and hidden scrollbars
content = content.replace(
  /<main className="flex items-start flex-nowrap w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory pt-4 pb-12 hide-scrollbar"[^>]*>/,
  `<main className="flex flex-nowrap w-full h-[calc(100vh-140px)] overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} ref={scrollContainerRef}>`
);

// 3. Make ALL sections constrained to 100% height and vertically scrollable inside
const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
sections.forEach(id => {
  const regex = new RegExp(`<div id="${id}" className="w-full flex-none snap-center relative min-h-\\[60vh\\] pr-2 sm:pr-4 pt-2">`);
  
  // Notice we use hide-scrollbar here so there are NO SCROLLBARS anywhere, per user request "Do not add the scroll bar to the website"
  content = content.replace(regex, `<div id="${id}" className="w-full flex-none snap-center relative h-full overflow-y-auto overflow-x-hidden hide-scrollbar pr-2 sm:pr-4 pt-2 pb-24" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>`);
});

// 4. Update the JS Wheel Handler
// Instead of custom chunk jumping, we use native smooth scrolling.
// On desktop wheel:
// 1. Allow normal vertical scroll in children.
// 2. If at bounds (or not on a scrollable child), translate deltaY to horizontal container scroll Left.
// Let's use simple smooth scrolling by adjusting scrollLeft.
const newWheelHandler = `
  // Smooth Horizontal Scroll Matrix
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Allow native horizontal swiping (trackpads)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // Find if we are scrolling inside a vertical element
      let target = e.target as HTMLElement | null;
      let isVerticalScrollable = false;
      while (target && target !== container) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            const isAtTop = target.scrollTop <= 1;
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

      if (!isVerticalScrollable) {
        e.preventDefault();
        
        // Exact 1:1 translation of vertical wheel to horizontal translation
        // Using 'auto' behavior because continuous delta firing creates a smooth feel with native hardware.
        // It's the standard way desktop horizontal row scrolling is implemented.
        container.scrollBy({
          left: e.deltaY,
          behavior: 'auto'
        });
      }
    };
    
    // Add non-passive wheel event to wrapper so we can preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Use intersection observer to detect active tab silently
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveTab(entry.target.id as ActiveTab);
        }
      });
    }, { threshold: 0.5, root: container });

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

const regexObserver = /\/\/ Window Scroll and Tab Transition Tracking[\s\S]*?observer\.observe\(el\);\s*\}\);\s*return \(\) => \{\s*window\.removeEventListener\('wheel', handleWheel\);\s*observer\.disconnect\(\);\s*\};\s*\}, \[\]\);/m;
content = content.replace(regexObserver, newWheelHandler.trim());

fs.writeFileSync('src/App.tsx', content);

import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const observerContent = `
  // Horizontal Scroll and Active Tab Tracking
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow native horizontal scrolling (trackpad/magic mouse right/left swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // Check if the scroll target is inside a vertically scrollable element
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

      // If they are trying to scroll vertically on the page background or a non-scrollable area:
      if (!isVerticalScrollable) {
        e.preventDefault();
        
        // Use a cooldown to prevent rapid-fire scrolling over multiple pages (especially from trackpad inertia)
        const now = Date.now();
        if (now - lastWheelTimeRef.current < 600) {
          return;
        }
        lastWheelTimeRef.current = now;

        const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
        const cw = container.clientWidth;
        
        // Find closest active index based on scroll position
        const currentIdx = Math.round(container.scrollLeft / cw);
        
        let nextIdx = currentIdx + (e.deltaY > 0 ? 1 : -1);
        
        if (nextIdx >= 0 && nextIdx < sections.length) {
          const id = sections[nextIdx];
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    };
    
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

const regex = /\/\/ Horizontal Scroll and Active Tab Tracking[\s\S]*?observer\.observe\(el\);\s*\}\);\s*return \(\) => \{\s*observer\.disconnect\(\);\s*\};\s*\}, \[\]\);/m;

content = content.replace(regex, observerContent.trim());

// Also make sure we don't have multiple imports of useRef, but we already have it from before!
fs.writeFileSync('src/App.tsx', content);

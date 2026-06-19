import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /\/\/ Horizontal Scroll and Active Tab Tracking[\s\S]*?container\.addEventListener\('wheel', handleWheel, \{ passive: false \}\);/m;

content = content.replace(regex, `// Horizontal Scroll and Active Tab Tracking
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;`);

const regex2 = /container\.removeEventListener\('wheel', handleWheel\);\s*observer\.disconnect\(\);/m;
content = content.replace(regex2, `observer.disconnect();`);

fs.writeFileSync('src/App.tsx', content);

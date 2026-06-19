import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replaceAll('snap-center ', '');
fs.writeFileSync('src/App.tsx', content);

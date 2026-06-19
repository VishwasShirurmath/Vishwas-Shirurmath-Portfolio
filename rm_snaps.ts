import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// remove snap from main
content = content.replace(
  /snap-x snap-mandatory/g,
  ''
);

// remove snap-center from sections
content = content.replace(
  /snap-center/g,
  ''
);

fs.writeFileSync('src/App.tsx', content);

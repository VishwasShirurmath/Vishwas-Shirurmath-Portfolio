import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
sections.forEach(id => {
  const regex = new RegExp(`<div id="${id}" className="w-full flex-none  relative h-full overflow-y-auto overflow-x-hidden hide-scrollbar pr-2 sm:pr-4 pt-2 pb-24" style=\\{\\{ scrollbarWidth: 'none', msOverflowStyle: 'none' \\}\\}>`);
  content = content.replace(regex, `<div id="${id}" className="w-full flex-none snap-center relative h-full overflow-y-auto overflow-x-hidden hide-scrollbar pr-2 sm:pr-4 pt-2 pb-24" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>`);
});

fs.writeFileSync('src/App.tsx', content);

import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
sections.forEach(id => {
  const regex = new RegExp(`<div id="${id}" className="w-full flex-none snap-center relative h-\\[calc\\(100vh-120px\\)\\] sm:h-\\[calc\\(100vh-140px\\)\\] pr-2 sm:pr-4 overflow-y-auto \\[\&::-webkit-scrollbar\\]:w-1\\.5 \\[\&::-webkit-scrollbar-track\\]:bg-transparent \\[\&::-webkit-scrollbar-thumb\\]:bg-stone-300 dark:\\[\&::-webkit-scrollbar-thumb\\]:bg-stone-700 \\[\&::-webkit-scrollbar-thumb\\]:rounded-full pt-2">`);
  
  content = content.replace(regex, `<div id="${id}" className="w-full flex-none snap-center relative min-h-[60vh] pr-2 sm:pr-4 pt-2">`);
});

fs.writeFileSync('src/App.tsx', content);

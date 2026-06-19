import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Update main to be 100% of the centered container, not viewport
content = content.replace(
  /<main className="flex flex-nowrap w-screen[^"]*"/,
  `<main className="flex flex-nowrap w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory pt-4 pb-12 hide-scrollbar"`
);

// Update child sections to take 100% of their container Width!
const sections = ['home', 'about', 'projects', 'blogs', 'activity', 'extracurricular', 'crm'];
sections.forEach(id => {
  const regex = new RegExp(`<div id="${id}" className="w-\\[100vw\\] sm:w-\\[calc\\(100vw-6rem\\)\\] max-w-7xl flex-none snap-center relative h-\\[calc\\(100vh-140px\\)\\] pr-4 sm:pr-8 overflow-y-auto \\[\&::-webkit-scrollbar\\]:w-1\\.5 \\[\&::-webkit-scrollbar-track\\]:bg-transparent \\[\&::-webkit-scrollbar-thumb\\]:bg-stone-300 dark:\\[\&::-webkit-scrollbar-thumb\\]:bg-stone-700 \\[\&::-webkit-scrollbar-thumb\\]:rounded-full pt-2">`);
  
  content = content.replace(regex, `<div id="${id}" className="w-full flex-none snap-center relative h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] pr-2 sm:pr-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-thumb]:bg-stone-700 [&::-webkit-scrollbar-thumb]:rounded-full pt-2">`);
});

fs.writeFileSync('src/App.tsx', content);

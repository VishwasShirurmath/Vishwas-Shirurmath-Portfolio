import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regexMap = [
  // Platform details paragraph
  [/className="text-xs leading-relaxed/g, 'className="text-sm leading-relaxed'],
  [/className="text-\\[10px\\] font-mono font-medium"/g, 'className="text-xs font-mono font-medium"'],
  [/className="text-\\[10px\\] text-stone-400 font-mono/g, 'className="text-xs text-stone-400 font-mono'],
  [/className="text-\\[11px\\] leading-relaxed(.*?)>\\s*\{area.topics\}/g, 'className="text-sm leading-relaxed$1>\\n                                {area.topics}'],
  [/className="text-\\[11px\\] font-semibold/g, 'className="text-sm font-semibold'],
  [/className="text-xs font-bold transition-all shadow-md/g, 'className="text-sm font-bold transition-all shadow-md'],
  [/className="inline-flex items-center px-2 py-0\\.5 rounded-full text-\\[10px\\] font-bold/g, 'className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold'],
  [/className="font-mono text-\\[10px\\] font-medium uppercase/g, 'className="font-mono text-xs font-medium uppercase'],
];

for (const [regex, replacement] of regexMap) {
  content = content.replace(regex, replacement as string);
}

fs.writeFileSync('src/App.tsx', content);

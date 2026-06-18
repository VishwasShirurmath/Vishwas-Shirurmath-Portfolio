const fs = require('fs');

const userData = JSON.parse(fs.readFileSync('src/user-data.json', 'utf8'));
let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// Strip the import
dataTs = dataTs.replace("import userSavedData from './user-data.json';\n", "");

let outputDataTs = dataTs.substring(0, dataTs.indexOf('export const INITIAL_PROFILE'));

outputDataTs += `export const INITIAL_PROFILE: ProfileInfo = ${JSON.stringify(userData.profile, null, 2)};\n\n`;

outputDataTs += `export const INITIAL_PROJECTS: ProjectEntry[] = ${JSON.stringify(userData.projects || [], null, 2)};\n\n`;

outputDataTs += `export const INITIAL_BLOGS: BlogPost[] = ${JSON.stringify(userData.blogs || [], null, 2)};\n\n`;

outputDataTs += `export const INITIAL_TRACKERS: ActivityTracker[] = [
  { id: 'track-1', name: 'LeetCode Problems', category: 'coding', target: 5, current: 2, unit: 'problems solved', color: 'from-amber-400 to-orange-500' },
  { id: 'track-2', name: 'GitHub Commits', category: 'coding', target: 8, current: 4, unit: 'commits made', color: 'from-cyan-400 to-blue-500' },
  { id: 'track-3', name: 'Coding Hours', category: 'coding', target: 6, current: 3, unit: 'hours logged', color: 'from-emerald-400 to-teal-500' },
  { id: 'track-4', name: 'Technical Docs Pages', category: 'learning', target: 20, current: 12, unit: 'pages read', color: 'from-purple-400 to-indigo-500' },
  { id: 'track-5', name: 'Hydration Log', category: 'wellbeing', target: 8, current: 5, unit: 'cups of water', color: 'from-blue-400 to-sky-500' }
];\n\n`;

outputDataTs += `export const INITIAL_EXPERIENCES: ExperienceEntry[] = ${JSON.stringify(userData.experiences || [], null, 2)};\n`;

fs.writeFileSync('src/data.ts', outputDataTs);

// Update App.tsx
let appTs = fs.readFileSync('src/App.tsx', 'utf8');

appTs = appTs.replace("import userSavedData from './user-data.json';\n", "");

appTs = appTs.replace(/return userSavedData\.spotlightProject[ \s\S]*?\};\n/m, `return ${JSON.stringify(userData.spotlightProject, null, 4)};\n`);
appTs = appTs.replace(/return userSavedData\.featuredBlog[ \s\S]*?\};\n/m, `return ${JSON.stringify(userData.featuredBlog, null, 4)};\n`);

appTs = appTs.replace(/return saved \? parseInt\(saved, 10\) : \(userSavedData\.introDuration \|\| 3000\);/g, `return saved ? parseInt(saved, 10) : ${userData.introDuration || 3000};`);

appTs = appTs.replace(/return userSavedData\.introSteps \? userSavedData\.introSteps : \[[\s\S]*?\];/g, `return [${(userData.introSteps||[]).map(x=>JSON.stringify(x)).join(', ')}];`);

appTs = appTs.replace(/userSavedData\.heroHeadline \|\|/g, `${JSON.stringify(userData.heroHeadline)} ||`);
appTs = appTs.replace(/userSavedData\.workingCategory \|\|/g, `${JSON.stringify(userData.workingCategory)} ||`);
appTs = appTs.replace(/userSavedData\.workingTitle \|\|/g, `${JSON.stringify(userData.workingTitle)} ||`);
appTs = appTs.replace(/userSavedData\.workingDesc \|\|/g, `${JSON.stringify(userData.workingDesc)} ||`);

appTs = appTs.replace(/return userSavedData\.dsaPlatforms \? userSavedData\.dsaPlatforms : \[[\s\S]*?\];/g, `return ${JSON.stringify(userData.dsaPlatforms || [], null, 4)};`);
appTs = appTs.replace(/return userSavedData\.learningAreas \? userSavedData\.learningAreas : \[[\s\S]*?\];/g, `return ${JSON.stringify(userData.learningAreas || [], null, 4)};`);
appTs = appTs.replace(/return userSavedData\.extracurriculars \? userSavedData\.extracurriculars : \[[\s\S]*?\];/g, `return ${JSON.stringify(userData.extracurriculars || [], null, 4)};`);

appTs = appTs.replace("const fallbackThemeId = userSavedData.themeId;", `const fallbackThemeId = ${JSON.stringify(userData.themeId || '')};`);

fs.writeFileSync('src/App.tsx', appTs);

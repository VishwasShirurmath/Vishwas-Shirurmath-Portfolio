import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/setShowConfigModal\(true\);/g, "setActiveTab('crm');");
fs.writeFileSync('src/App.tsx', content);
console.log("Replaced successfully!");

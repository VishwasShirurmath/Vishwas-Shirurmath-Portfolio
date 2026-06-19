import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The replacement was `content.replace(/<\/motion\.div>\s*\}\)/g, '</motion.div>\n              </div>');`
// But the matched string is `</motion.div>\n              )}` 
// Let's replace manually.
const toReplace = `                </motion.div>
              )}`;
const replacement = `                </motion.div>
              </div>`;

content = content.replaceAll(toReplace, replacement);

fs.writeFileSync('src/App.tsx', content);

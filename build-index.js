const fs = require('fs');
const path = require('path');

const markdownDir = path.join(__dirname, 'markdown');
const outputFile = path.join(__dirname, 'files.json');

// Read all .md files from the markdown directory
const files = fs.readdirSync(markdownDir).filter(f => f.endsWith('.md'));

const result = files.map(file => {
  const content = fs.readFileSync(path.join(markdownDir, file), 'utf-8');
  // Extract the first # heading (title)
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/, '');
  return { file, title };
});

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`Generated files.json with ${result.length} entries:`);
result.forEach(item => console.log(`  - ${item.title}`));
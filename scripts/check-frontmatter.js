const fs = require('fs');
const path = require('path');

const microsites = [
  { 
    slug: 'the-bra', 
    legacyDir: 'legacy/movie-websites/the-bra/', 
    contentDir: 'content/films/the-bra/',
    legacyName: 'Vom Lokführer, der die Liebe suchte...',
    category: 'HTML-based'
  },
  { 
    slug: 'behind-the-couch', 
    legacyDir: 'legacy/movie-websites/behindthecouch/', 
    contentDir: 'content/films/behind-the-couch/',
    legacyName: 'Behind the Couch - Casting in Hollywood',
    category: 'HTML-based'
  },
  { 
    slug: 'quatsch', 
    legacyDir: 'legacy/movie-websites/quatsch/', 
    contentDir: 'content/films/fiddlesticks/',
    legacyName: 'Quatsch und die Nasenbärbande',
    category: 'HTML-based'
  },
  { 
    slug: 'baikonur', 
    legacyDir: 'legacy/movie-websites/baikonur/', 
    contentDir: 'content/films/baikonur/',
    legacyName: 'Baikonur',
    category: 'HTML-based (with Flash video player)'
  },
  { 
    slug: 'tuvalu', 
    legacyDir: 'legacy/movie-websites/tuvalu/', 
    contentDir: 'content/films/tuvalu/',
    legacyName: 'Tuvalu',
    category: 'Hybrid (Flash intro + HTML content)'
  }
];

const results = { found: [], missing: [], issues: [] };

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) {
      fm[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return fm;
}

console.log('================================================================================');
console.log('HTML Microsite Extraction QA Report');
console.log('================================================================================\n');

microsites.forEach(m => {
  console.log(`## ${m.slug}`);
  console.log(`   Legacy: ${m.legacyName}`);
  console.log(`   Category: ${m.category}`);
  
  if (!fs.existsSync(m.contentDir)) {
    console.log(`  ❌ Content directory missing: ${m.contentDir}\n`);
    results.missing.push({ slug: m.slug, reason: 'Content dir missing', category: m.category });
    return;
  }
  
  if (!fs.existsSync(m.legacyDir)) {
    console.log(`  ⚠️  Legacy directory missing: ${m.legacyDir}\n`);
    results.missing.push({ slug: m.slug, reason: 'Legacy dir missing', category: m.category });
    return;
  }
  
  const mdFiles = fs.readdirSync(m.contentDir).filter(f => f.endsWith('.md'));
  
  if (mdFiles.length === 0) {
    console.log(`  ❌ No markdown files found\n`);
    results.missing.push({ slug: m.slug, reason: 'No MD files', category: m.category });
    return;
  }
  
  console.log(`  ✅ Found ${mdFiles.length} markdown file(s): ${mdFiles.join(', ')}`);
  
  mdFiles.forEach(file => {
    const filePath = path.join(m.contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = extractFrontmatter(content);
    
    if (!fm) {
      console.log(`    ❌ ${file}: No frontmatter`);
      results.issues.push({ slug: m.slug, file, issue: 'No frontmatter' });
      return;
    }
    
    const required = ['title', 'type', 'language'];
    const missing = required.filter(f => !fm[f]);
    
    if (missing.length > 0) {
      console.log(`    ⚠️  ${file}: Missing fields: ${missing.join(', ')}`);
      results.issues.push({ slug: m.slug, file, issue: `Missing: ${missing.join(', ')}` });
    } else {
      console.log(`    ✅ ${file}: Valid frontmatter`);
    }
    
    console.log(`       Title: ${fm.title || 'N/A'}`);
    console.log(`       Type: ${fm.type || 'N/A'}`);
    console.log(`       Language: ${fm.language || 'N/A'}`);
    
    if (fm.slug) console.log(`       Slug: ${fm.slug}`);
    if (fm.year) console.log(`       Year: ${fm.year}`);
  });
  
  results.found.push({ slug: m.slug, files: mdFiles.length, category: m.category });
  console.log('');
});

console.log('================================================================================');
console.log('SUMMARY');
console.log('================================================================================');
console.log(`✅ Successfully extracted: ${results.found.length} microsites`);
console.log(`❌ Missing or incomplete: ${results.missing.length} microsites`);
console.log(`⚠️  Frontmatter issues: ${results.issues.length} files\n`);

if (results.missing.length > 0) {
  console.log('Missing/Incomplete:');
  results.missing.forEach(i => console.log(`  - ${i.slug}: ${i.reason}`));
  console.log('');
}

if (results.issues.length > 0) {
  console.log('Frontmatter Issues:');
  results.issues.forEach(i => console.log(`  - ${i.slug}/${i.file}: ${i.issue}`));
  console.log('');
}

console.log('Results object:');
console.log(JSON.stringify(results, null, 2));

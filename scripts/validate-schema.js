#!/usr/bin/env node

/**
 * Schema.org Movie Structured Data Validator
 * 
 * Validates that all film pages contain valid Schema.org Movie markup
 * that should pass Google's Rich Results Test.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..', '_site');

function findFilmPages(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findFilmPages(fullPath, files);
    } else if (entry.name === 'index.html' && fullPath.includes('/films/')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function validateSchemaInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract JSON-LD script
  const match = content.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  
  if (!match) {
    return { valid: false, error: 'No JSON-LD script found' };
  }
  
  try {
    const schema = JSON.parse(match[1]);
    
    // Validate required fields for Schema.org Movie
    const errors = [];
    
    if (schema['@context'] !== 'https://schema.org') {
      errors.push('Missing or invalid @context');
    }
    
    if (schema['@type'] !== 'Movie') {
      errors.push('Missing or invalid @type');
    }
    
    if (!schema.name) {
      errors.push('Missing required field: name');
    }
    
    if (!schema.description) {
      errors.push('Missing required field: description');
    }
    
    // Validate optional but recommended fields
    const warnings = [];
    
    if (!schema.director) {
      warnings.push('Missing recommended field: director');
    }
    
    if (!schema.datePublished) {
      warnings.push('Missing recommended field: datePublished');
    }
    
    if (!schema.image) {
      warnings.push('Missing recommended field: image');
    }
    
    // Validate ISO 8601 duration format if present
    if (schema.duration && !/^PT(\d+H)?(\d+M)?$/.test(schema.duration)) {
      errors.push('Invalid duration format (must be ISO 8601, e.g., PT1H30M)');
    }
    
    // Validate VideoObject if trailer exists
    if (schema.trailer) {
      if (schema.trailer['@type'] !== 'VideoObject') {
        errors.push('Trailer must be of type VideoObject');
      }
      if (!schema.trailer.name) {
        errors.push('Trailer missing required field: name');
      }
      if (!schema.trailer.contentUrl) {
        errors.push('Trailer missing required field: contentUrl');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      schema
    };
    
  } catch (e) {
    return { valid: false, error: `JSON parse error: ${e.message}` };
  }
}

function main() {
  console.log('🔍 Validating Schema.org Movie structured data...\n');
  
  const filmPages = findFilmPages(SITE_DIR);
  
  let totalValid = 0;
  let totalInvalid = 0;
  
  for (const filePath of filmPages) {
    const relativePath = path.relative(SITE_DIR, filePath);
    const result = validateSchemaInFile(filePath);
    
    if (result.valid) {
      console.log(`✅ ${relativePath}`);
      totalValid++;
      
      if (result.warnings && result.warnings.length > 0) {
        result.warnings.forEach(w => console.log(`   ⚠️  ${w}`));
      }
    } else {
      console.log(`❌ ${relativePath}`);
      totalInvalid++;
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.errors) {
        result.errors.forEach(e => console.log(`   ❌ ${e}`));
      }
    }
  }
  
  console.log(`\n📊 Results: ${totalValid} valid, ${totalInvalid} invalid\n`);
  
  if (totalInvalid > 0) {
    console.log('❌ Some pages have invalid structured data');
    process.exit(1);
  }
  
  console.log('✅ All film pages have valid Schema.org Movie structured data!');
  console.log('\n💡 Next step: Test with Google Rich Results Test:');
  console.log('   https://search.google.com/test/rich-results\n');
}

main();


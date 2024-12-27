const fs = require('fs-extra');
const path = require('path');

const THEME_VARIANTS = [
    'default',
    'storm',
    'night',
    'moonlight',
    'sunset',
    'forest',
    'ocean'
];

async function loadBaseColors() {
    const colorsPath = path.join(__dirname, '../src/themes/base/colors.json');
    return JSON.parse(await fs.readFile(colorsPath, 'utf8'));
}

async function generateThemes() {
    const baseColors = await loadBaseColors();
    const buildVSCode = require('./build-vscode');
    const buildJetBrains = require('./build-jetbrains');
    const buildSublime = require('./build-sublime');
    const buildAtom = require('./build-atom');
    
    // Create dist directory
    const distDir = path.join(__dirname, '../dist');
    await fs.ensureDir(distDir);
    
    // Generate themes for each variant
    for (const variant of THEME_VARIANTS) {
        const colors = variant === 'default' ? baseColors.colors : {
            ...baseColors.colors,
            ...baseColors.variants[variant]
        };
        
        console.log(`Generating ${variant} theme...`);
        
        // Build for each editor
        await Promise.all([
            buildVSCode(colors, variant),
            buildJetBrains(colors, variant),
            buildSublime(colors, variant),
            buildAtom(colors, variant)
        ]);
    }
    
    // Build marketing site
    console.log('Building marketing site...');
    const { buildMarketing } = require('./build-marketing');
    await buildMarketing();
    
    // Generate preview images
    console.log('Generating preview images...');
    const { generatePreviews } = require('./create-preview-images');
    await generatePreviews();
    
    console.log('All builds completed successfully!');
}

// Run the build process
generateThemes().catch(console.error);

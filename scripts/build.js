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

async function buildThemes() {
    // Create dist directory
    await fs.ensureDir('dist');

    // Build VS Code theme
    console.log('Building VS Code theme...');
    await fs.copy('src/themes/vscode', 'dist/vscode');

    // Build JetBrains theme
    console.log('Building JetBrains theme...');
    await fs.copy('src/themes/jetbrains', 'dist/jetbrains');

    // Build Sublime Text theme
    console.log('Building Sublime theme...');
    await fs.copy('src/themes/sublime', 'dist/sublime');

    // Build Atom theme
    console.log('Building Atom theme...');
    await fs.copy('src/themes/atom', 'dist/atom');

    // Build marketing site
    console.log('Building marketing site...');
    await fs.copy('src/marketing', 'dist/marketing');

    console.log('Build completed successfully!');
}

buildThemes().catch(console.error);

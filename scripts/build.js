const fs = require('fs-extra');
const path = require('path');

const THEME_VARIANTS = [
    'aurora',
    'sakura',
    'ember',
    'glacier',
    'borealis'
];

async function loadBaseColors() {
    const colorsPath = path.join(__dirname, '../src/themes/base/colors.json');
    return JSON.parse(await fs.readFile(colorsPath, 'utf8'));
}

async function buildThemes() {
    console.log('Starting theme build process...');
    
    // Create dist directory
    const distDir = path.join(__dirname, '../dist');
    await fs.ensureDir(distDir);

    // Load base colors
    const baseColors = await loadBaseColors();
    
    // Create editor-specific directories
    await fs.ensureDir(path.join(distDir, 'vscode'));
    await fs.ensureDir(path.join(distDir, 'jetbrains'));
    await fs.ensureDir(path.join(distDir, 'sublime'));
    await fs.ensureDir(path.join(distDir, 'atom'));

    // Copy theme files
    console.log('Copying VS Code themes...');
    await fs.copy(
        path.join(__dirname, '../src/themes/vscode'),
        path.join(distDir, 'vscode')
    );

    console.log('Copying JetBrains themes...');
    await fs.copy(
        path.join(__dirname, '../src/themes/jetbrains'),
        path.join(distDir, 'jetbrains')
    );

    console.log('Copying Sublime Text themes...');
    await fs.copy(
        path.join(__dirname, '../src/themes/sublime'),
        path.join(distDir, 'sublime')
    );

    console.log('Copying Atom themes...');
    await fs.copy(
        path.join(__dirname, '../src/themes/atom'),
        path.join(distDir, 'atom')
    );

    // Build marketing site
    console.log('Building marketing site...');
    await fs.copy(
        path.join(__dirname, '../src/marketing'),
        path.join(distDir, 'marketing')
    );

    console.log('Build completed successfully!');
}

buildThemes().catch(console.error);

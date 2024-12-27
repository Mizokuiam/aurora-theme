const fs = require('fs-extra');
const path = require('path');
const { parseThemeFile } = require('../test/utils/parser');
const { validateColors } = require('../test/utils/validator');

async function validateThemes() {
    // Validate VS Code themes
    const vscodePath = path.join(__dirname, '../src/themes/vscode');
    const vscodeFiles = await fs.readdir(vscodePath);
    for (const file of vscodeFiles) {
        if (file.endsWith('.json')) {
            const theme = await fs.readJson(path.join(vscodePath, file));
            if (!theme.colors || !theme.colors['editor.background'] || !theme.colors['editor.foreground']) {
                throw new Error(`VS Code theme ${file} is missing required colors`);
            }
        }
    }

    // Validate JetBrains themes
    const jetbrainsPath = path.join(__dirname, '../src/themes/jetbrains');
    const jetbrainsFiles = await fs.readdir(jetbrainsPath);
    for (const file of jetbrainsFiles) {
        if (file.endsWith('.xml')) {
            const theme = await parseThemeFile(path.join(jetbrainsPath, file));
            const validation = validateColors(theme);
            if (!validation.isValid) {
                throw new Error(`JetBrains theme ${file} validation failed: ${JSON.stringify(validation)}`);
            }
        }
    }

    // Validate Sublime Text themes
    const sublimePath = path.join(__dirname, '../src/themes/sublime');
    const sublimeFiles = await fs.readdir(sublimePath);
    for (const file of sublimeFiles) {
        if (file.endsWith('.tmTheme')) {
            const content = await fs.readFile(path.join(sublimePath, file), 'utf8');
            if (!content.includes('<key>background</key>') || !content.includes('<key>foreground</key>')) {
                throw new Error(`Sublime theme ${file} is missing required colors`);
            }
        }
    }

    // Validate Atom themes
    const atomPath = path.join(__dirname, '../src/themes/atom');
    const atomFiles = await fs.readdir(atomPath);
    for (const file of atomFiles) {
        if (file.endsWith('.less')) {
            const content = await fs.readFile(path.join(atomPath, file), 'utf8');
            if (!content.includes('@syntax-bg') || !content.includes('@syntax-fg')) {
                throw new Error(`Atom theme ${file} is missing required variables`);
            }
        }
    }

    console.log('All theme files validated successfully!');
}

validateThemes().catch(console.error);

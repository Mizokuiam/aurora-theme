const fs = require('fs-extra');
const path = require('path');
const { parseThemeFile } = require('../test/utils/parser');
const { validateColors } = require('../test/utils/validator');

async function validateThemes() {
    // Validate VS Code themes
    const vscodePath = path.join(__dirname, '../src/themes/vscode');
    const vscodeFiles = await fs.readdir(vscodePath);
    for (const file of vscodeFiles) {
        if (file.endsWith('-color-theme.json')) {
            const theme = await fs.readJson(path.join(vscodePath, file));
            if (!theme.colors || !theme.colors['editor.background'] || !theme.colors['editor.foreground']) {
                throw new Error(`VS Code theme ${file} is missing required colors`);
            }
            // Check tokenColors
            if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length === 0) {
                throw new Error(`VS Code theme ${file} is missing token colors`);
            }
            // Validate required scopes
            const requiredScopes = ['keyword', 'string', 'constant.numeric', 'comment'];
            const foundScopes = theme.tokenColors.flatMap(token => 
                Array.isArray(token.scope) ? token.scope : [token.scope]
            );
            const missingScopes = requiredScopes.filter(scope => 
                !foundScopes.some(found => found && found.includes(scope))
            );
            if (missingScopes.length > 0) {
                throw new Error(`VS Code theme ${file} is missing required scopes: ${missingScopes.join(', ')}`);
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
                throw new Error(`JetBrains theme ${file} validation failed:\nMissing required colors: ${validation.missingRequired.join(', ')}\nMissing syntax colors: ${validation.missingSyntax.join(', ')}`);
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
            // Check for basic scopes
            const requiredScopes = ['keyword', 'string', 'constant.numeric', 'comment'];
            const missingScopes = requiredScopes.filter(scope => 
                !content.includes(`<string>${scope}</string>`)
            );
            if (missingScopes.length > 0) {
                throw new Error(`Sublime theme ${file} is missing required scopes: ${missingScopes.join(', ')}`);
            }
        }
    }

    console.log('All themes validated successfully!');
}

validateThemes().catch(console.error);

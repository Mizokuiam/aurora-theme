const fs = require('fs-extra');
const path = require('path');
const { validateContrast } = require('../test/utils/validator');

async function checkContrast() {
    const MIN_CONTRAST_RATIO = 4.5; // WCAG AA standard for normal text
    
    // Check VS Code themes
    const vscodePath = path.join(__dirname, '../src/themes/vscode');
    const vscodeFiles = await fs.readdir(vscodePath);
    for (const file of vscodeFiles) {
        if (file.endsWith('-color-theme.json')) {
            const theme = await fs.readJson(path.join(vscodePath, file));
            const bg = theme.colors['editor.background'];
            const fg = theme.colors['editor.foreground'];
            const ratio = validateContrast(bg, fg);
            
            if (ratio < MIN_CONTRAST_RATIO) {
                throw new Error(`VS Code theme ${file} has insufficient contrast ratio: ${ratio.toFixed(2)} (minimum: ${MIN_CONTRAST_RATIO})`);
            }
            
            // Check selection contrast
            const selectionBg = theme.colors['editor.selectionBackground'];
            const selectionFg = theme.colors['editor.selectionForeground'] || fg;
            if (selectionBg && selectionFg) {
                const selectionRatio = validateContrast(selectionBg, selectionFg);
                if (selectionRatio < MIN_CONTRAST_RATIO) {
                    throw new Error(`VS Code theme ${file} has insufficient selection contrast ratio: ${selectionRatio.toFixed(2)}`);
                }
            }
        }
    }

    // Check JetBrains themes
    const jetbrainsPath = path.join(__dirname, '../src/themes/jetbrains');
    const jetbrainsFiles = await fs.readdir(jetbrainsPath);
    for (const file of jetbrainsFiles) {
        if (file.endsWith('.xml')) {
            const content = await fs.readFile(path.join(jetbrainsPath, file), 'utf8');
            const bgMatch = content.match(/BACKGROUND" value="([^"]+)"/);
            const fgMatch = content.match(/FOREGROUND" value="([^"]+)"/);
            
            if (bgMatch && fgMatch) {
                const ratio = validateContrast(bgMatch[1], fgMatch[1]);
                if (ratio < MIN_CONTRAST_RATIO) {
                    throw new Error(`JetBrains theme ${file} has insufficient contrast ratio: ${ratio.toFixed(2)}`);
                }
            }
            
            // Check selection contrast
            const selBgMatch = content.match(/SELECTION_BACKGROUND" value="([^"]+)"/);
            const selFgMatch = content.match(/SELECTION_FOREGROUND" value="([^"]+)"/);
            
            if (selBgMatch && selFgMatch) {
                const selectionRatio = validateContrast(selBgMatch[1], selFgMatch[1]);
                if (selectionRatio < MIN_CONTRAST_RATIO) {
                    throw new Error(`JetBrains theme ${file} has insufficient selection contrast ratio: ${selectionRatio.toFixed(2)}`);
                }
            }
        }
    }
    
    console.log('All themes pass WCAG AA contrast requirements!');
}

checkContrast().catch(console.error);

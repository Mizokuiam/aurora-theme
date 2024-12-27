const fs = require('fs-extra');
const path = require('path');
const contrast = require('wcag-contrast');

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
}

async function checkContrast() {
    // Check VS Code themes
    const vscodePath = path.join(__dirname, '../src/themes/vscode');
    const vscodeFiles = await fs.readdir(vscodePath);
    for (const file of vscodeFiles) {
        if (file.endsWith('.json')) {
            const theme = await fs.readJson(path.join(vscodePath, file));
            const bg = theme.colors['editor.background'];
            const fg = theme.colors['editor.foreground'];
            const ratio = contrast.rgb(hexToRGB(bg), hexToRGB(fg));
            if (ratio < 4.5) {
                throw new Error(`VS Code theme ${file} has insufficient contrast ratio: ${ratio}`);
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
                const bg = '#' + bgMatch[1];
                const fg = '#' + fgMatch[1];
                const ratio = contrast.rgb(hexToRGB(bg), hexToRGB(fg));
                if (ratio < 4.5) {
                    throw new Error(`JetBrains theme ${file} has insufficient contrast ratio: ${ratio}`);
                }
            }
        }
    }

    console.log('All themes pass WCAG AA contrast requirements!');
}

checkContrast().catch(console.error);

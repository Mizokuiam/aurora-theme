const fs = require('fs-extra');
const path = require('path');

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1, l2) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
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
            const [bgR, bgG, bgB] = hexToRGB(bg);
            const [fgR, fgG, fgB] = hexToRGB(fg);
            const bgLum = getLuminance(bgR, bgG, bgB);
            const fgLum = getLuminance(fgR, fgG, fgB);
            const ratio = getContrastRatio(bgLum, fgLum);
            if (ratio < 4.5) {
                throw new Error(`VS Code theme ${file} has insufficient contrast ratio: ${ratio.toFixed(2)}`);
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
                const [bgR, bgG, bgB] = hexToRGB(bg);
                const [fgR, fgG, fgB] = hexToRGB(fg);
                const bgLum = getLuminance(bgR, bgG, bgB);
                const fgLum = getLuminance(fgR, fgG, fgB);
                const ratio = getContrastRatio(bgLum, fgLum);
                if (ratio < 4.5) {
                    throw new Error(`JetBrains theme ${file} has insufficient contrast ratio: ${ratio.toFixed(2)}`);
                }
            }
        }
    }

    console.log('All themes pass WCAG AA contrast requirements!');
}

checkContrast().catch(console.error);

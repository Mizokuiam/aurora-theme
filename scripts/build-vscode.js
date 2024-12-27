const fs = require('fs-extra');
const path = require('path');

async function buildVSCodeTheme(colors, variant = 'default') {
    const distDir = path.join(__dirname, '../dist/vscode');
    await fs.ensureDir(distDir);

    const packageJson = {
        "name": `aurora-theme-${variant}`,
        "displayName": `Aurora Theme - ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
        "description": "A beautiful dark theme for VS Code",
        "version": "1.0.0",
        "publisher": "aurora-theme",
        "engines": {
            "vscode": "^1.60.0"
        },
        "categories": [
            "Themes"
        ],
        "contributes": {
            "themes": [
                {
                    "label": `Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
                    "uiTheme": "vs-dark",
                    "path": `./themes/aurora-${variant}-color-theme.json`
                }
            ]
        }
    };

    const themeContent = {
        "name": `Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
        "type": "dark",
        "colors": {
            "editor.background": colors.background,
            "editor.foreground": colors.foreground,
            "editor.selectionBackground": colors.selection,
            "editor.lineHighlightBackground": colors.activeLine,
            // Add more color mappings
        },
        "tokenColors": [
            {
                "scope": ["comment", "punctuation.definition.comment"],
                "settings": {
                    "foreground": colors.comment
                }
            },
            {
                "scope": ["keyword", "storage.type", "storage.modifier"],
                "settings": {
                    "foreground": colors.keyword
                }
            },
            // Add more token colors
        ]
    };

    await fs.writeJson(
        path.join(distDir, 'package.json'),
        packageJson,
        { spaces: 2 }
    );

    await fs.ensureDir(path.join(distDir, 'themes'));
    await fs.writeJson(
        path.join(distDir, 'themes', `aurora-${variant}-color-theme.json`),
        themeContent,
        { spaces: 2 }
    );

    console.log(`VS Code theme package built for variant: ${variant}`);
}

module.exports = buildVSCodeTheme;

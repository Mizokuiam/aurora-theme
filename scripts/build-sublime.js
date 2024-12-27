const fs = require('fs-extra');
const path = require('path');

async function buildSublimeTheme(colors, variant = 'default') {
    const distDir = path.join(__dirname, '../dist/sublime');
    await fs.ensureDir(distDir);

    const themeContent = {
        "name": `Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
        "author": "Aurora Theme",
        "variables": {
            "background": colors.background,
            "foreground": colors.foreground,
            "selection": colors.selection,
            "activeLine": colors.activeLine,
            "comment": colors.comment,
            "keyword": colors.keyword
        },
        "globals": {
            "background": "var(background)",
            "foreground": "var(foreground)",
            "selection": "var(selection)",
            "caret": "var(foreground)",
            "line_highlight": "var(activeLine)"
        },
        "rules": [
            {
                "name": "Comment",
                "scope": "comment",
                "foreground": "var(comment)",
                "font_style": "italic"
            },
            {
                "name": "Keyword",
                "scope": "keyword, storage",
                "foreground": "var(keyword)"
            }
        ]
    };

    await fs.writeJson(
        path.join(distDir, `Aurora-${variant}.sublime-color-scheme`),
        themeContent,
        { spaces: 2 }
    );

    // Create package metadata
    const packageJson = {
        "name": `Aurora Theme - ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
        "description": "A beautiful dark theme for Sublime Text",
        "version": "1.0.0",
        "author": "Aurora Theme",
        "homepage": "https://github.com/yourusername/aurora-theme",
        "themes": [
            `Aurora-${variant}.sublime-color-scheme`
        ]
    };

    await fs.writeJson(
        path.join(distDir, 'package.json'),
        packageJson,
        { spaces: 2 }
    );

    console.log(`Sublime Text theme package built for variant: ${variant}`);
}

module.exports = buildSublimeTheme;

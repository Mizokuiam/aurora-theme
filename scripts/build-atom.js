const fs = require('fs-extra');
const path = require('path');

async function buildAtomTheme(colors, variant = 'default') {
    const distDir = path.join(__dirname, '../dist/atom');
    await fs.ensureDir(distDir);
    await fs.ensureDir(path.join(distDir, 'styles'));

    const themeContent = `
// Aurora Theme for Atom/Pulsar - ${variant.charAt(0).toUpperCase() + variant.slice(1)} variant

// Colors
@background: ${colors.background};
@foreground: ${colors.foreground};
@selection: ${colors.selection};
@activeLine: ${colors.activeLine};
@comment: ${colors.comment};
@keyword: ${colors.keyword};

// Base styles
atom-text-editor {
    background-color: @background;
    color: @foreground;

    .selection .region {
        background-color: @selection;
    }

    .line.cursor-line {
        background-color: @activeLine;
    }
}

// Syntax highlighting
.syntax--comment {
    color: @comment;
    font-style: italic;
}

.syntax--keyword {
    color: @keyword;
}

// Add more syntax highlighting rules as needed
`;

    await fs.writeFile(
        path.join(distDir, 'styles', `aurora-${variant}.less`),
        themeContent
    );

    // Create package.json
    const packageJson = {
        "name": `aurora-theme-${variant}-syntax`,
        "theme": "syntax",
        "version": "1.0.0",
        "description": `Aurora Theme ${variant.charAt(0).toUpperCase() + variant.slice(1)} for Atom/Pulsar`,
        "keywords": [
            "syntax",
            "theme",
            "dark",
            "aurora"
        ],
        "repository": "https://github.com/yourusername/aurora-theme",
        "license": "MIT",
        "engines": {
            "atom": ">=1.0.0 <2.0.0"
        }
    };

    await fs.writeJson(
        path.join(distDir, 'package.json'),
        packageJson,
        { spaces: 2 }
    );

    // Create index.less
    const indexLess = `@import "./styles/aurora-${variant}";`;
    await fs.writeFile(path.join(distDir, 'index.less'), indexLess);

    console.log(`Atom/Pulsar theme package built for variant: ${variant}`);
}

module.exports = buildAtomTheme;

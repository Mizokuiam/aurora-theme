const fs = require('fs-extra');
const path = require('path');
const Color = require('color');

const THEME_VARIANTS = [
    'default',
    'storm',
    'night',
    'moonlight',
    'sunset',
    'forest',
    'ocean'
];

const EDITORS = {
    vscode: {
        extension: '.json',
        template: 'src/themes/vscode/aurora-theme.json',
        outputDir: 'dist/vscode'
    },
    jetbrains: {
        extension: '.xml',
        template: 'src/themes/jetbrains/Aurora.xml',
        outputDir: 'dist/jetbrains'
    },
    sublime: {
        extension: '.sublime-color-scheme',
        template: 'src/themes/sublime/Aurora.sublime-color-scheme',
        outputDir: 'dist/sublime'
    },
    atom: {
        extension: '.less',
        template: 'src/themes/atom/aurora-syntax.less',
        outputDir: 'dist/atom'
    }
};

async function loadBaseColors() {
    const colorsPath = path.join(__dirname, '../src/themes/base/colors.json');
    return JSON.parse(await fs.readFile(colorsPath, 'utf8'));
}

async function generateThemes() {
    const baseColors = await loadBaseColors();
    
    for (const variant of THEME_VARIANTS) {
        const colors = variant === 'default' ? baseColors.colors : {
            ...baseColors.colors,
            ...baseColors.variants[variant]
        };
        
        for (const [editor, config] of Object.entries(EDITORS)) {
            const outputDir = path.join(__dirname, '..', config.outputDir);
            await fs.ensureDir(outputDir);
            
            const template = await fs.readFile(
                path.join(__dirname, '..', config.template),
                'utf8'
            );
            
            const theme = generateEditorTheme(editor, template, colors, variant);
            
            const outputPath = path.join(
                outputDir,
                `aurora-${variant}${config.extension}`
            );
            
            await fs.writeFile(outputPath, theme);
            console.log(`Generated ${outputPath}`);
        }
    }
}

function generateEditorTheme(editor, template, colors, variant) {
    switch (editor) {
        case 'vscode':
            return generateVSCodeTheme(template, colors, variant);
        case 'jetbrains':
            return generateJetBrainsTheme(template, colors, variant);
        case 'sublime':
            return generateSublimeTheme(template, colors, variant);
        case 'atom':
            return generateAtomTheme(template, colors, variant);
        default:
            throw new Error(`Unsupported editor: ${editor}`);
    }
}

function generateVSCodeTheme(template, colors, variant) {
    const theme = JSON.parse(template);
    // Update VS Code specific theme properties
    theme.name = `Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    theme.colors = {
        ...theme.colors,
        "editor.background": colors.primary.background,
        "editor.foreground": colors.primary.foreground,
        // Add more VS Code specific color mappings
    };
    return JSON.stringify(theme, null, 2);
}

function generateJetBrainsTheme(template, colors, variant) {
    let theme = template;
    // Update JetBrains specific theme properties
    theme = theme.replace(/BACKGROUND_COLOR/g, colors.primary.background);
    theme = theme.replace(/FOREGROUND_COLOR/g, colors.primary.foreground);
    // Add more JetBrains specific color mappings
    return theme;
}

function generateSublimeTheme(template, colors, variant) {
    const theme = JSON.parse(template);
    theme.name = `Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    theme.variables = {
        ...theme.variables,
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        // Add more Sublime specific color mappings
    };
    return JSON.stringify(theme, null, 2);
}

function generateAtomTheme(template, colors, variant) {
    let theme = template;
    // Update Atom specific theme properties
    theme = theme.replace(/@syntax-text-color: .*?;/, `@syntax-text-color: ${colors.primary.foreground};`);
    theme = theme.replace(/@syntax-background-color: .*?;/, `@syntax-background-color: ${colors.primary.background};`);
    // Add more Atom specific color mappings
    return theme;
}

// Run the build process
generateThemes().catch(console.error);

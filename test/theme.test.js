const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { parseThemeFile } = require('./utils/parser');
const { validateColors, validateContrast } = require('./utils/validator');

describe('Aurora Theme', () => {
    describe('VS Code Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/vscode/aurora-theme.json');
            theme = await fs.readJson(themePath);
        });
        
        it('should have required color tokens', () => {
            assert(theme.colors);
            assert(theme.colors['editor.background']);
            assert(theme.colors['editor.foreground']);
        });
        
        it('should maintain minimum contrast ratio', () => {
            const background = theme.colors['editor.background'];
            const foreground = theme.colors['editor.foreground'];
            assert(validateContrast(background, foreground) >= 4.5);
        });
    });
    
    describe('JetBrains Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/jetbrains/Aurora.xml');
            theme = await parseThemeFile(themePath);
            console.log('JetBrains Theme:', JSON.stringify(theme, null, 2));
        });
        
        it('should have required color options', () => {
            assert(theme.colors);
            assert(theme.colors.BACKGROUND);
            assert(theme.colors.FOREGROUND);
        });
        
        it('should have consistent syntax highlighting', () => {
            const syntaxColors = validateColors(theme);
            console.log('Syntax Colors Validation:', syntaxColors);
            assert(syntaxColors.isValid);
        });
    });
    
    describe('Sublime Text Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/sublime/Aurora.tmTheme');
            theme = await parseThemeFile(themePath);
        });
        
        it('should have valid plist structure', () => {
            assert(theme.name === 'Aurora');
            assert(Array.isArray(theme.settings));
        });
        
        it('should have base colors defined', () => {
            const baseColors = theme.settings[0];
            assert(baseColors.settings.background);
            assert(baseColors.settings.foreground);
        });
    });
    
    describe('Atom/Pulsar Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/atom/Aurora.less');
            theme = await fs.readFile(themePath, 'utf8');
        });
        
        it('should have required variables', () => {
            assert(theme.includes('@background'));
            assert(theme.includes('@foreground'));
        });
        
        it('should have syntax highlighting rules', () => {
            assert(theme.includes('.syntax--source'));
            assert(theme.includes('.syntax--keyword'));
            assert(theme.includes('.syntax--string'));
        });
    });
});

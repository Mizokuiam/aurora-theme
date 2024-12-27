const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { parseThemeFile } = require('./utils/parser');
const { validateColors, validateContrast } = require('./utils/validator');

describe('Aurora Theme', () => {
    describe('VS Code Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/vscode/aurora-dark-color-theme.json');
            theme = await fs.readJson(themePath);
        });
        
        it('should have required color tokens', () => {
            assert(theme.colors);
            assert(theme.colors['editor.background']);
            assert(theme.colors['editor.foreground']);
            assert(theme.colors['editor.selectionBackground']);
            assert(theme.colors['editor.selectionForeground']);
        });
        
        it('should maintain minimum contrast ratio', () => {
            const background = theme.colors['editor.background'];
            const foreground = theme.colors['editor.foreground'];
            const selectionBg = theme.colors['editor.selectionBackground'];
            const selectionFg = theme.colors['editor.selectionForeground'];
            
            // Check main text contrast
            assert(validateContrast(background, foreground) >= 4.5, 'Main text contrast ratio is too low');
            
            // Check selection contrast
            assert(validateContrast(selectionBg, selectionFg) >= 4.5, 'Selection text contrast ratio is too low');
        });
    });
    
    describe('JetBrains Theme', () => {
        let theme;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/jetbrains/Aurora.xml');
            theme = await parseThemeFile(themePath);
        });
        
        it('should have required color options', () => {
            assert(theme.colors);
            assert(theme.colors.BACKGROUND);
            assert(theme.colors.FOREGROUND);
            assert(theme.colors.SELECTION_BACKGROUND);
            assert(theme.colors.SELECTION_FOREGROUND);
        });
        
        it('should have consistent syntax highlighting', () => {
            const syntaxColors = validateColors(theme);
            assert(syntaxColors.isValid, `Missing colors: ${JSON.stringify(syntaxColors)}`);
        });
    });
    
    describe('Sublime Text Theme', () => {
        let themeContent;
        
        before(async () => {
            const themePath = path.join(__dirname, '../src/themes/sublime/Aurora.tmTheme');
            themeContent = await fs.readFile(themePath, 'utf8');
        });
        
        it('should have valid plist structure', () => {
            assert(themeContent.includes('<?xml version="1.0" encoding="UTF-8"?>'));
            assert(themeContent.includes('<!DOCTYPE plist PUBLIC'));
        });
        
        it('should have base colors defined', () => {
            assert(themeContent.includes('<key>background</key>'));
            assert(themeContent.includes('<key>foreground</key>'));
            assert(themeContent.includes('<key>selection</key>'));
            assert(themeContent.includes('<key>lineHighlight</key>'));
        });
    });
});

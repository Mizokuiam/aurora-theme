# Aurora Theme Customization Guide

This guide explains how to customize Aurora Theme to match your preferences across different editors.

## Table of Contents
- [Color Customization](#color-customization)
- [Editor-Specific Customization](#editor-specific-customization)
- [Creating Custom Variants](#creating-custom-variants)
- [Advanced Customization](#advanced-customization)

## Color Customization

### Base Colors
Aurora's color scheme is built around these primary colors:

```json
{
    "primary": {
        "background": "#1a1b26",
        "foreground": "#c0caf5",
        "accent": "#7aa2f7"
    }
}
```

### Syntax Colors
Customize syntax highlighting:

```json
{
    "syntax": {
        "keywords": "#9d7cd8",
        "strings": "#9ece6a",
        "numbers": "#ff9e64",
        "functions": "#7aa2f7",
        "comments": "#565f89",
        "variables": "#bb9af7"
    }
}
```

## Editor-Specific Customization

### VS Code
1. Create a settings file:
```json
{
    "workbench.colorCustomizations": {
        "[Aurora]": {
            "editor.background": "#1a1b26",
            "editor.foreground": "#c0caf5"
        }
    },
    "editor.tokenColorCustomizations": {
        "[Aurora]": {
            "comments": "#565f89",
            "functions": "#7aa2f7"
        }
    }
}
```

### JetBrains IDEs
1. Open Settings/Preferences
2. Go to Editor → Color Scheme
3. Select Aurora and click "Duplicate"
4. Modify colors in the Color Scheme editor

### Sublime Text
Create a custom scheme file:
```json
{
    "extends": "Aurora.sublime-color-scheme",
    "variables": {
        "background": "#1a1b26",
        "foreground": "#c0caf5"
    }
}
```

### Atom/Pulsar
Modify `styles.less`:
```less
atom-text-editor {
    background-color: #1a1b26;
    color: #c0caf5;
}
```

## Creating Custom Variants

1. Create a new variant in `colors.json`:
```json
{
    "variants": {
        "custom": {
            "primary": {
                "background": "#YOUR_BG",
                "foreground": "#YOUR_FG",
                "accent": "#YOUR_ACCENT"
            },
            "syntax": {
                "keywords": "#YOUR_KEYWORDS",
                "strings": "#YOUR_STRINGS"
            }
        }
    }
}
```

2. Run the build script:
```bash
npm run build
```

## Advanced Customization

### Color Relationships
- Background colors should have contrast ratio ≥ 4.5:1
- Syntax colors should be distinguishable
- Accent colors should pop but not strain eyes

### Theme Extension
1. Fork the repository
2. Modify `src/themes/base/colors.json`
3. Add new color schemes
4. Update build scripts
5. Generate new assets

### Terminal Integration
Customize terminal colors:
```json
{
    "terminal": {
        "black": "#15161e",
        "red": "#f7768e",
        "green": "#9ece6a",
        "yellow": "#e0af68",
        "blue": "#7aa2f7",
        "magenta": "#bb9af7",
        "cyan": "#7dcfff",
        "white": "#c0caf5"
    }
}
```

### UI Elements
Customize UI components:
```json
{
    "ui": {
        "selection": "#283457",
        "activeLineBackground": "#1f2335",
        "widgetBackground": "#1f2335"
    }
}
```

## Best Practices

1. **Color Harmony**
   - Use complementary colors
   - Maintain consistent saturation
   - Keep contrast ratios accessible

2. **Syntax Highlighting**
   - Make important code elements stand out
   - Use softer colors for less important elements
   - Keep comments readable but subtle

3. **Testing**
   - Test in different lighting conditions
   - Verify readability with various file types
   - Check contrast ratios with tools

4. **Version Control**
   - Keep a backup of original theme
   - Document all changes
   - Use semantic versioning

# Customizing Aurora Theme

Aurora theme is designed to be customizable while maintaining its signature look. This guide will help you customize the theme for your preferred editor.

## Color Palette

Aurora uses the following color palette:

```css
/* Base Colors */
Background: #1a1b26
Foreground: #c0caf5
Selection: #33467c
Active Line: #292e42
Comments: #565f89

/* Syntax Colors */
Purple: #bb9af7    /* Keywords, Attributes */
Green: #9ece6a     /* Strings */
Orange: #ff9e64    /* Numbers, Constants */
Blue: #7aa2f7      /* Functions */
Cyan: #7dcfff      /* Classes, Types */
Red: #f7768e       /* Tags, Errors */
Yellow: #e0af68    /* Parameters */
```

## VS Code Customization

1. Create a custom settings file:
   ```jsonc
   // settings.json
   {
     "workbench.colorCustomizations": {
       "[Aurora]": {
         "editor.background": "#1a1b26",
         "editor.foreground": "#c0caf5",
         "editor.selectionBackground": "#33467c",
         "editor.lineHighlightBackground": "#292e42"
       }
     },
     "editor.tokenColorCustomizations": {
       "[Aurora]": {
         "comments": "#565f89",
         "functions": "#7aa2f7",
         "keywords": "#bb9af7",
         "strings": "#9ece6a",
         "numbers": "#ff9e64",
         "types": "#7dcfff"
       }
     }
   }
   ```

## JetBrains Customization

1. Locate the `Aurora.xml` file in your IDE's config directory
2. Open it in a text editor
3. Modify the color values:
   ```xml
   <option name="BACKGROUND" value="1a1b26"/>
   <option name="FOREGROUND" value="c0caf5"/>
   ```

## Sublime Text Customization

1. Open the `Aurora.tmTheme` file
2. Modify the color values:
   ```xml
   <key>settings</key>
   <dict>
       <key>background</key>
       <string>#1a1b26</string>
       <key>foreground</key>
       <string>#c0caf5</string>
   </dict>
   ```

## Atom/Pulsar Customization

1. Open your `styles.less` file
2. Add custom overrides:
   ```less
   atom-text-editor {
     // Base colors
     @background: #1a1b26;
     @foreground: #c0caf5;
     
     // Syntax colors
     .syntax--keyword { color: #bb9af7; }
     .syntax--string { color: #9ece6a; }
     .syntax--number { color: #ff9e64; }
   }
   ```

## Custom Builds

To create your own custom build:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aurora-theme.git
   cd aurora-theme
   ```

2. Modify the color variables in `src/colors.js`:
   ```javascript
   module.exports = {
     background: '#1a1b26',
     foreground: '#c0caf5',
     // ... add your colors
   };
   ```

3. Run the build script:
   ```bash
   npm run build
   ```

4. Find your custom theme in the `dist` directory

## Theme Structure

The theme is organized as follows:

```
src/
├── colors.js           # Base color definitions
├── themes/
│   ├── vscode/        # VS Code specific theme
│   ├── jetbrains/     # JetBrains specific theme
│   ├── sublime/       # Sublime Text specific theme
│   └── atom/          # Atom/Pulsar specific theme
└── templates/         # Theme templates
```

## Best Practices

1. **Maintain Contrast**: Keep a minimum contrast ratio of 4.5:1 for text
2. **Consistent Highlighting**: Use similar colors for similar constructs
3. **Test Changes**: Test your customizations with different file types
4. **Backup Original**: Always backup the original theme files before modifying

## Contributing Changes

If you've made improvements to the theme:

1. Fork the repository
2. Create a new branch for your changes
3. Submit a pull request with your modifications
4. Include before/after screenshots

## Support

Need help with customization?

1. Check our [GitHub Issues](https://github.com/yourusername/aurora-theme/issues)
2. Join our [Discord community](https://discord.gg/aurora-theme)
3. Email us at support@aurora-theme.com

# Editor Support

Aurora Theme supports a wide range of editors and IDEs. Here's how to install and customize Aurora in each environment.

## Visual Studio Code

### Installation
1. Copy the theme files to your VS Code extensions directory:
   - Windows: `%USERPROFILE%\.vscode\extensions\aurora-theme`
   - macOS/Linux: `~/.vscode/extensions/aurora-theme`
2. Restart VS Code
3. Select the theme: `Ctrl/Cmd + K, Ctrl/Cmd + T` → Choose "Aurora"

### Customization
Modify `settings.json` to customize:
```json
{
    "workbench.colorCustomizations": {
        "[Aurora]": {
            "editor.background": "#1a1b26"
        }
    }
}
```

## JetBrains IDEs

### Installation
1. Go to Settings/Preferences → Editor → Color Scheme
2. Click the gear icon → Import Scheme
3. Select the Aurora `.icls` file
4. Click Apply

### Supported IDEs
- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- Rider
- GoLand
- RubyMine

## Sublime Text

### Installation
1. Copy the `.sublime-color-scheme` file to:
   - Windows: `%APPDATA%\Sublime Text\Packages\User`
   - macOS: `~/Library/Application Support/Sublime Text/Packages/User`
   - Linux: `~/.config/sublime-text/Packages/User`
2. Select the theme: Preferences → Select Color Scheme → Aurora

### Customization
Create a custom version:
```json
{
    "extends": "Aurora.sublime-color-scheme",
    "variables": {
        "bg": "#1a1b26"
    }
}
```

## Atom/Pulsar

### Installation
1. Copy the theme files to:
   - Windows: `%USERPROFILE%\.atom\packages\aurora-syntax`
   - macOS/Linux: `~/.atom/packages/aurora-syntax`
2. Select the theme in Settings → Themes

### Customization
Modify the Less variables in `syntax-variables.less`

## Terminal Emulators

### Windows Terminal
```json
{
    "schemes": [
        {
            "name": "Aurora",
            "background": "#1a1b26",
            "foreground": "#c0caf5"
            // ... other colors
        }
    ]
}
```

### iTerm2
1. Download the `.itermcolors` file
2. Go to Preferences → Profiles → Colors
3. Import from the Color Presets dropdown

## Additional Support

For other editors or terminals:
- Use the base color schemes in `src/themes/base/colors.json`
- Follow the editor's theme creation guidelines
- Contact support for assistance

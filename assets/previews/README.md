# Theme Preview Images

This directory should contain preview images for each theme variant and editor combination.

## Required Preview Images

### VS Code
For each variant (default, storm, night, moonlight, sunset, forest, ocean):
- `vscode/[variant]-python.png`: Python code preview
- `vscode/[variant]-javascript.png`: JavaScript code preview

### JetBrains
For each variant:
- `jetbrains/[variant]-main.png`: Main IDE preview

### Sublime Text
For each variant:
- `sublime/[variant]-main.png`: Editor preview

### Terminal
For each variant:
- `terminal/[variant]-main.png`: Terminal preview

## Image Specifications

- Resolution: 1200x800 pixels
- Format: PNG
- DPI: 144
- Color Space: sRGB

## Preview Content Guidelines

### Python Example
```python
def calculate_fibonacci(n: int) -> list[int]:
    """Calculate Fibonacci sequence up to n numbers."""
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib
```

### JavaScript Example
```javascript
class ThemeManager {
    constructor() {
        this.currentTheme = 'aurora-default';
        this.variants = ['storm', 'night', 'moonlight'];
    }

    async switchTheme(variant) {
        try {
            const theme = await this.loadTheme(variant);
            this.applyTheme(theme);
        } catch (error) {
            console.error('Failed to switch theme:', error);
        }
    }
}
```

## Creating Preview Images

1. Use the code examples above
2. Ensure consistent window decorations
3. Show line numbers
4. Include minimap (VS Code)
5. Show file tree in IDE previews

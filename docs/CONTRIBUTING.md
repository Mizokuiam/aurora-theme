# Contributing to Aurora Theme

We love your input! We want to make contributing to Aurora Theme as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Project Structure

```
aurora-theme/
├── src/
│   ├── themes/
│   │   ├── base/
│   │   ├── vscode/
│   │   ├── jetbrains/
│   │   ├── sublime/
│   │   └── atom/
│   └── utils/
├── scripts/
├── assets/
│   ├── previews/
│   └── wallpapers/
├── docs/
└── marketing/
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/mizokuiam/aurora-theme.git
cd aurora-theme
```

2. Install dependencies:
```bash
npm install
```

3. Build the themes:
```bash
npm run build
```

## Adding New Features

### Adding a New Theme Variant

1. Add your variant to `src/themes/base/colors.json`:
```json
{
    "variants": {
        "your-variant": {
            "primary": {
                "background": "#...",
                "foreground": "#...",
                "accent": "#..."
            }
        }
    }
}
```

2. Generate preview images:
```bash
npm run generate-previews
```

3. Update documentation in `docs/THEME_VARIANTS.md`

### Adding Editor Support

1. Create a new directory in `src/themes/`
2. Add template files
3. Update the build script
4. Add documentation
5. Generate preview images

## Style Guide

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Style Guide

- 2 spaces for indentation
- Use semicolons
- 80 character line length
- Use `const` or `let` - no `var`
- Use template literals for string interpolation

### Documentation Style Guide

- Use [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
- Include code examples where relevant
- Keep line length to 80 characters
- Use clear, concise language

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

- [VS Code Theme API](https://code.visualstudio.com/api/references/theme-color)
- [JetBrains Theme Development](https://plugins.jetbrains.com/docs/intellij/themes.html)
- [Sublime Text Color Schemes](https://www.sublimetext.com/docs/color_schemes.html)
- [Atom Theme Development](https://flight-manual.atom.io/hacking-atom/sections/creating-a-theme/)

## Community

- Follow us on [Twitter](https://x.com/MrMizoku)
- Star us on [GitHub](https://github.com/mizokuiam/aurora-theme)

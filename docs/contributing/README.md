# Contributing to Aurora Theme

Thank you for your interest in contributing to Aurora Theme! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

1. Be respectful and inclusive
2. Use welcoming and inclusive language
3. Be collaborative
4. Focus on what is best for the community
5. Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/aurora-theme/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment details

### Suggesting Enhancements

1. Open a new issue with the "enhancement" label
2. Describe your suggestion in detail
3. Include mockups or examples if possible
4. Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test your changes
5. Commit with clear messages:
   ```bash
   git commit -m "feat: add new color scheme for Python"
   ```
6. Push to your fork
7. Create a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aurora-theme.git
   cd aurora-theme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a new branch:
   ```bash
   git checkout -b your-feature
   ```

## Project Structure

```
aurora-theme/
├── src/                # Source files
│   ├── colors.js       # Color definitions
│   └── themes/         # Editor-specific themes
├── scripts/            # Build scripts
├── test/              # Test files
├── docs/              # Documentation
└── dist/              # Built files
```

## Coding Standards

### JavaScript
- Use ES6+ features
- Follow ESLint configuration
- Add JSDoc comments for functions

### CSS/LESS
- Use consistent naming convention
- Follow color palette guidelines
- Maintain contrast ratios

### XML/PLIST
- Use consistent indentation
- Follow editor-specific schemas
- Validate files before committing

## Testing

1. Run tests:
   ```bash
   npm test
   ```

2. Test in different editors:
   - VS Code
   - JetBrains IDEs
   - Sublime Text
   - Atom/Pulsar

## Documentation

- Update relevant documentation
- Add JSDoc comments
- Include code examples
- Update changelog

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a new release on GitHub
4. Publish to package managers

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

## Getting Help

- Join our [Discord server](https://discord.gg/aurora-theme)
- Check the [FAQ](https://github.com/yourusername/aurora-theme/wiki/FAQ)
- Email the maintainers

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

Thank you for contributing to Aurora Theme!

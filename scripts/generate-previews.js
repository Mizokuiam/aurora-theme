const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

const PREVIEW_SAMPLES = {
    python: `
def calculate_fibonacci(n: int) -> list[int]:
    """Calculate Fibonacci sequence up to n numbers."""
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib

def main():
    # Generate first 10 Fibonacci numbers
    result = calculate_fibonacci(10)
    print(f"First 10 Fibonacci numbers: {result}")

if __name__ == "__main__":
    main()
    `,
    javascript: `
// Aurora Theme Demo
class ThemeManager {
    constructor() {
        this.currentTheme = 'aurora-default';
        this.variants = ['storm', 'night', 'moonlight'];
    }

    async switchTheme(variant) {
        try {
            const theme = await this.loadTheme(variant);
            this.applyTheme(theme);
            console.log(\`Switched to \${variant} theme\`);
        } catch (error) {
            console.error('Failed to switch theme:', error);
        }
    }
}
    `,
    rust: `
#[derive(Debug)]
struct AuroraTheme {
    name: String,
    variant: String,
    colors: HashMap<String, String>,
}

impl AuroraTheme {
    pub fn new(variant: &str) -> Self {
        let mut colors = HashMap::new();
        colors.insert("background".to_string(), "#1a1b26".to_string());
        colors.insert("foreground".to_string(), "#c0caf5".to_string());
        
        AuroraTheme {
            name: "Aurora".to_string(),
            variant: variant.to_string(),
            colors,
        }
    }
}
    `
};

async function generatePreviews() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport size for preview images
    await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 2
    });

    // Generate previews for each variant and language
    const variants = ['default', 'storm', 'night', 'moonlight', 'sunset'];
    const languages = Object.keys(PREVIEW_SAMPLES);

    for (const variant of variants) {
        for (const lang of languages) {
            // Load theme and create preview
            const previewPath = path.join(__dirname, `../assets/previews/${variant}-${lang}.png`);
            await generatePreview(page, variant, lang, PREVIEW_SAMPLES[lang], previewPath);
        }
    }

    await browser.close();
}

async function generatePreview(page, variant, language, code, outputPath) {
    // Load theme colors
    const theme = require(`../dist/vscode/aurora-${variant}.json`);
    
    // Create HTML with syntax highlighting
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css" rel="stylesheet" />
            <style>
                body {
                    background-color: ${theme.colors['editor.background']};
                    margin: 2rem;
                    font-family: 'Fira Code', monospace;
                }
                pre {
                    padding: 1.5rem;
                    border-radius: 8px;
                    background-color: ${theme.colors['editor.background']} !important;
                }
                code {
                    font-family: 'Fira Code', monospace !important;
                    font-size: 14px !important;
                    line-height: 1.5 !important;
                }
            </style>
        </head>
        <body>
            <pre><code class="language-${language}">${code}</code></pre>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-${language}.min.js"></script>
        </body>
        </html>
    `;

    await page.setContent(html);
    await page.screenshot({
        path: outputPath,
        quality: 100,
        type: 'png'
    });
}

generatePreviews().catch(console.error);

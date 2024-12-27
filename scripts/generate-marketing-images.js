const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const VARIANTS = ['default', 'storm', 'night'];
const MARKETING_DIR = path.join(__dirname, '../marketing/images/product');

// Colors based on variant
const COLORS = {
    default: {
        bg: '#1a1b26',
        accent: '#7aa2f7',
        text: '#c0caf5'
    },
    storm: {
        bg: '#24283b',
        accent: '#bb9af7',
        text: '#a9b1d6'
    },
    night: {
        bg: '#1a1b26',
        accent: '#f7768e',
        text: '#c0caf5'
    }
};

async function generateVSCodeScreenshot(variant) {
    const width = 1200;
    const height = 800;
    
    // Create base image with background color
    const image = sharp({
        create: {
            width,
            height,
            channels: 4,
            background: COLORS[variant].bg
        }
    });

    // Create SVG overlay for UI elements
    const svg = `
        <svg width="${width}" height="${height}">
            <rect x="0" y="0" width="${width}" height="30" fill="#16161e"/>
            <rect x="0" y="30" width="50" height="${height-30}" fill="#16161e"/>
            <text x="70" y="60" font-family="monospace" font-size="14" fill="${COLORS[variant].text}">
                <tspan x="70" dy="0">function createAurora(variant) {</tspan>
                <tspan x="70" dy="20">  const theme = new Theme({</tspan>
                <tspan x="70" dy="20">    name: \`Aurora \${variant}\`,</tspan>
                <tspan x="70" dy="20">    colors: themeColors[variant],</tspan>
                <tspan x="70" dy="20">    tokenColors: syntaxColors[variant]</tspan>
                <tspan x="70" dy="20">  });</tspan>
                <tspan x="70" dy="20"></tspan>
                <tspan x="70" dy="20">  return theme.compile();</tspan>
                <tspan x="70" dy="20">}</tspan>
            </text>
        </svg>
    `;

    // Composite the SVG over the background
    const final = await image
        .composite([{
            input: Buffer.from(svg),
            top: 0,
            left: 0
        }])
        .png()
        .toBuffer();

    // Save the image
    const outputDir = path.join(MARKETING_DIR, 'screenshots');
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, `vscode-${variant}.png`), final);
    console.log(`Generated VS Code screenshot for ${variant}`);
}

async function generateFeatureComparison() {
    const width = 1200;
    const height = 800;
    
    // Create base image with background color
    const svg = `
        <svg width="${width}" height="${height}">
            <rect x="0" y="0" width="${width}" height="${height}" fill="#1a1b26"/>
            <text x="${width/2}" y="60" font-family="Arial" font-size="32" fill="#7aa2f7" text-anchor="middle">
                Aurora Theme Plans
            </text>
            <g transform="translate(${width/6}, 120)">
                <text font-family="Arial" font-size="24" fill="#c0caf5" text-anchor="middle">Personal</text>
                <text y="50" font-family="Arial" font-size="36" fill="#7aa2f7" text-anchor="middle">$19</text>
            </g>
            <g transform="translate(${width/2}, 120)">
                <text font-family="Arial" font-size="24" fill="#c0caf5" text-anchor="middle">Pro</text>
                <text y="50" font-family="Arial" font-size="36" fill="#7aa2f7" text-anchor="middle">$29</text>
            </g>
            <g transform="translate(${5*width/6}, 120)">
                <text font-family="Arial" font-size="24" fill="#c0caf5" text-anchor="middle">Team</text>
                <text y="50" font-family="Arial" font-size="36" fill="#7aa2f7" text-anchor="middle">$99</text>
            </g>
        </svg>
    `;

    const final = await sharp({
        create: {
            width,
            height,
            channels: 4,
            background: '#1a1b26'
        }
    })
    .composite([{
        input: Buffer.from(svg),
        top: 0,
        left: 0
    }])
    .png()
    .toBuffer();

    // Save the image
    await fs.ensureDir(MARKETING_DIR);
    await fs.writeFile(path.join(MARKETING_DIR, 'feature-comparison.png'), final);
    console.log('Generated feature comparison');
}

async function generateWallpaperPreview() {
    const width = 1200;
    const height = 400;
    
    // Create base image with background color
    const svg = `
        <svg width="${width}" height="${height}">
            <rect x="0" y="0" width="${width}" height="${height}" fill="#1a1b26"/>
            <text x="${width/2}" y="${height/2}" font-family="Arial" font-size="24" fill="#c0caf5" text-anchor="middle">
                Aurora Theme Wallpapers
            </text>
        </svg>
    `;

    const final = await sharp({
        create: {
            width,
            height,
            channels: 4,
            background: '#1a1b26'
        }
    })
    .composite([{
        input: Buffer.from(svg),
        top: 0,
        left: 0
    }])
    .png()
    .toBuffer();

    // Save the image
    await fs.ensureDir(MARKETING_DIR);
    await fs.writeFile(path.join(MARKETING_DIR, 'wallpaper-preview.png'), final);
    console.log('Generated wallpaper preview');
}

async function generateAllImages() {
    console.log('Generating marketing images...');

    // Create VS Code screenshots for each variant
    for (const variant of VARIANTS) {
        await generateVSCodeScreenshot(variant);
    }

    // Generate feature comparison
    await generateFeatureComparison();

    // Generate wallpaper preview
    await generateWallpaperPreview();

    console.log('All marketing images generated!');
}

generateAllImages().catch(console.error);

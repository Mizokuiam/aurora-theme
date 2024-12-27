const fs = require('fs-extra');
const path = require('path');
const { createCanvas } = require('canvas');

const THEME_VARIANTS = [
    'default',
    'storm',
    'night',
    'moonlight',
    'sunset',
    'forest',
    'ocean'
];

const RESOLUTIONS = {
    desktop: {
        '4k': { width: 3840, height: 2160 },
        '2k': { width: 2560, height: 1440 },
        'fhd': { width: 1920, height: 1080 }
    },
    mobile: {
        'iphone': { width: 1284, height: 2778 },
        'android': { width: 1440, height: 3040 }
    },
    watch: {
        'apple': { width: 396, height: 484 },
        'wear': { width: 450, height: 450 }
    }
};

async function loadThemeColors() {
    const colorsPath = path.join(__dirname, '../src/themes/base/colors.json');
    const baseColors = JSON.parse(await fs.readFile(colorsPath, 'utf8'));
    return baseColors;
}

function createGradient(ctx, width, height, colors) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary.background);
    gradient.addColorStop(0.5, colors.primary.accent);
    gradient.addColorStop(1, colors.primary.background);
    return gradient;
}

function drawPattern(ctx, width, height, colors) {
    // Draw grid pattern
    ctx.strokeStyle = colors.primary.foreground;
    ctx.globalAlpha = 0.1;
    const gridSize = 50;
    
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

async function generateWallpaper(variant, type, size, colors) {
    const { width, height } = RESOLUTIONS[type][size];
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fill background
    const gradient = createGradient(ctx, width, height, colors);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add pattern
    drawPattern(ctx, width, height, colors);
    
    // Save wallpaper
    const outputDir = path.join(__dirname, `../assets/wallpapers/${type}/${size}`);
    await fs.ensureDir(outputDir);
    
    const outputPath = path.join(outputDir, `${variant}-${size}.png`);
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);
    
    console.log(`Generated wallpaper: ${outputPath}`);
}

async function generateAllWallpapers() {
    const baseColors = await loadThemeColors();
    
    for (const variant of THEME_VARIANTS) {
        const colors = variant === 'default' ? baseColors.colors : {
            ...baseColors.colors,
            ...baseColors.variants[variant]
        };
        
        for (const [type, sizes] of Object.entries(RESOLUTIONS)) {
            for (const size of Object.keys(sizes)) {
                await generateWallpaper(variant, type, size, colors);
            }
        }
    }
}

// Run the wallpaper generation
generateAllWallpapers().catch(console.error);

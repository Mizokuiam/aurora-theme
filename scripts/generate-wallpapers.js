const fs = require('fs-extra');
const path = require('path');
const { createCanvas } = require('canvas');

const THEME_VARIANTS = [
    'default',
    'storm',
    'night'
];

const RESOLUTIONS = {
    desktop: { width: 3840, height: 2160 },
    mobile: { width: 1284, height: 2778 },
    watch: { width: 396, height: 484 }
};

async function loadThemeColors() {
    const colorsPath = path.join(__dirname, '../src/themes/base/colors.json');
    const colors = {
        default: {
            background: '#1a1b26',
            accent: '#7aa2f7',
            foreground: '#c0caf5'
        },
        storm: {
            background: '#24283b',
            accent: '#bb9af7',
            foreground: '#a9b1d6'
        },
        night: {
            background: '#1a1b26',
            accent: '#f7768e',
            foreground: '#c0caf5'
        }
    };
    return colors;
}

function createGradient(ctx, width, height, colors) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.background);
    gradient.addColorStop(0.5, colors.accent);
    gradient.addColorStop(1, colors.background);
    return gradient;
}

function drawPattern(ctx, width, height, colors) {
    // Draw grid pattern
    ctx.strokeStyle = colors.foreground;
    ctx.globalAlpha = 0.1;
    const gridSize = Math.min(width, height) / 30;
    
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

async function generateWallpaper(variant, type, colors) {
    const { width, height } = RESOLUTIONS[type];
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fill background
    const gradient = createGradient(ctx, width, height, colors[variant]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add pattern
    drawPattern(ctx, width, height, colors[variant]);
    
    // Save wallpaper
    const outputDir = path.join(__dirname, '../marketing/images/wallpapers');
    await fs.ensureDir(outputDir);
    
    const outputPath = path.join(outputDir, `aurora-${variant}-${type}.png`);
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);
    
    console.log(`Generated wallpaper: ${outputPath}`);
}

async function generateAllWallpapers() {
    console.log('Starting wallpaper generation...');
    const colors = await loadThemeColors();
    
    for (const variant of THEME_VARIANTS) {
        for (const type of Object.keys(RESOLUTIONS)) {
            await generateWallpaper(variant, type, colors);
        }
    }
    
    console.log('Wallpaper generation complete!');
}

// Run the wallpaper generation
generateAllWallpapers().catch(console.error);

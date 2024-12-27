const { createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

const WALLPAPER_SIZES = {
    desktop: [
        { width: 3840, height: 2160, name: '4K' },        // 4K
        { width: 2560, height: 1440, name: '2K' },        // 2K
        { width: 1920, height: 1080, name: 'FHD' }        // Full HD
    ],
    mobile: [
        { width: 1284, height: 2778, name: 'iPhone14Pro' }, // iPhone 14 Pro
        { width: 1170, height: 2532, name: 'iPhone13' },    // iPhone 13
        { width: 1080, height: 2400, name: 'AndroidFHD' }   // Common Android
    ],
    watch: [
        { width: 396, height: 484, name: 'AppleWatch45mm' }, // Apple Watch 45mm
        { width: 368, height: 448, name: 'AppleWatch41mm' }  // Apple Watch 41mm
    ]
};

const THEMES = [
    { name: 'default', colors: ['#7aa2f7', '#bb9af7', '#7dcfff'] },
    { name: 'storm', colors: ['#7aa2f7', '#9d7cd8', '#7dcfff'] },
    { name: 'night', colors: ['#565f89', '#9d7cd8', '#7dcfff'] },
    { name: 'moonlight', colors: ['#7aa2f7', '#bb9af7', '#b4f9f8'] },
    { name: 'sunset', colors: ['#f7768e', '#ff9e64', '#e0af68'] },
    { name: 'forest', colors: ['#9ece6a', '#73daca', '#b4f9f8'] },
    { name: 'ocean', colors: ['#2ac3de', '#7dcfff', '#89ddff'] },
    { name: 'sakura', colors: ['#f7768e', '#ff9e64', '#bb9af7'] },
    { name: 'ember', colors: ['#f7768e', '#ff9e64', '#e0af68'] },
    { name: 'glacier', colors: ['#7dcfff', '#b4f9f8', '#c0caf5'] },
    { name: 'borealis', colors: ['#9ece6a', '#7aa2f7', '#bb9af7'] }
];

async function createWallpaper(width, height, theme, variant) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1b26';
    ctx.fillRect(0, 0, width, height);

    // Create gradient based on orientation
    const isPortrait = height > width;
    const gradient = ctx.createLinearGradient(
        isPortrait ? width/2 : 0,
        isPortrait ? 0 : height/2,
        isPortrait ? width/2 : width,
        isPortrait ? height : height/2
    );

    // Add color stops
    theme.colors.forEach((color, index) => {
        gradient.addColorStop(index / (theme.colors.length - 1), color);
    });

    // Draw aurora effect
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 5; i++) {
        const y = isPortrait ? height * 0.3 : height * 0.4;
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(i) * 50);
        
        // Create wavy pattern
        for (let x = 0; x < width; x += 50) {
            const wave = Math.sin(x * 0.01 + i) * 50;
            ctx.lineTo(x, y + wave);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 30 + i * 10;
        ctx.stroke();
    }

    // Add subtle noise texture
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10 - 5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    return canvas;
}

async function generateWallpapers() {
    const wallpaperDir = path.join(__dirname, '../assets/wallpapers');
    await fs.ensureDir(wallpaperDir);

    for (const theme of THEMES) {
        console.log(`Generating wallpapers for ${theme.name} theme...`);
        
        for (const [device, sizes] of Object.entries(WALLPAPER_SIZES)) {
            const deviceDir = path.join(wallpaperDir, device);
            await fs.ensureDir(deviceDir);

            for (const size of sizes) {
                const canvas = await createWallpaper(size.width, size.height, theme, device);
                const fileName = `aurora-${theme.name}-${size.name}.png`;
                const filePath = path.join(deviceDir, fileName);
                
                const buffer = canvas.toBuffer('image/png');
                await fs.writeFile(filePath, buffer);
                console.log(`Created ${fileName}`);
            }
        }
    }
}

generateWallpapers().catch(console.error);

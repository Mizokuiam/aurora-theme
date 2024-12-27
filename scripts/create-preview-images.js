const { createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

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

async function createPreview(width, height, theme) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1b26';
    ctx.fillRect(0, 0, width, height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    theme.colors.forEach((color, index) => {
        gradient.addColorStop(index / (theme.colors.length - 1), color);
    });

    // Draw aurora effect
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height * 0.4);
        
        // Create wavy pattern
        for (let x = 0; x < width; x += 20) {
            const wave = Math.sin(x * 0.02 + i) * 30;
            ctx.lineTo(x, height * 0.4 + wave);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 20 + i * 5;
        ctx.stroke();
    }

    return canvas;
}

async function generatePreviews() {
    const previewsDir = path.join(__dirname, '../marketing/previews');
    await fs.ensureDir(previewsDir);

    // Desktop preview (16:9)
    const desktopWidth = 800;
    const desktopHeight = 450;

    // Mobile preview (9:19.5)
    const mobileWidth = 400;
    const mobileHeight = 866;

    // Watch preview (1:1.22)
    const watchWidth = 300;
    const watchHeight = 366;

    for (const theme of THEMES) {
        console.log(`Generating previews for ${theme.name} theme...`);

        // Generate desktop preview
        const desktopCanvas = await createPreview(desktopWidth, desktopHeight, theme);
        await fs.writeFile(
            path.join(previewsDir, `aurora-${theme.name}-FHD.png`),
            desktopCanvas.toBuffer('image/png')
        );

        // Generate mobile preview
        const mobileCanvas = await createPreview(mobileWidth, mobileHeight, theme);
        await fs.writeFile(
            path.join(previewsDir, `aurora-${theme.name}-iPhone14Pro.png`),
            mobileCanvas.toBuffer('image/png')
        );

        // Generate watch preview
        const watchCanvas = await createPreview(watchWidth, watchHeight, theme);
        await fs.writeFile(
            path.join(previewsDir, `aurora-${theme.name}-AppleWatch45mm.png`),
            watchCanvas.toBuffer('image/png')
        );
    }

    console.log('Preview images generated successfully!');
}

generatePreviews().catch(console.error);

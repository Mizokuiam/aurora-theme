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
    { name: 'sakura', colors: ['#f7768e', '#bb9af7', '#ff9e64'] },
    { name: 'ember', colors: ['#f7768e', '#ff9e64', '#e0af68'] },
    { name: 'glacier', colors: ['#7dcfff', '#b4f9f8', '#89ddff'] },
    { name: 'borealis', colors: ['#9ece6a', '#7aa2f7', '#bb9af7'] },
    { name: 'sakura-alt', colors: ['#f7768e', '#ff9e64', '#bb9af7'] },
    { name: 'ember-alt', colors: ['#f7768e', '#e0af68', '#ff9e64'] },
    { name: 'glacier-alt', colors: ['#89ddff', '#b4f9f8', '#7dcfff'] },
    { name: 'borealis-alt', colors: ['#bb9af7', '#7aa2f7', '#9ece6a'] }
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
    const previewsDir = path.join(__dirname, '../dist/marketing/previews');
    await fs.ensureDir(previewsDir);
    
    // Generate preview images for each theme
    for (const theme of THEMES) {
        console.log(`Generating preview for ${theme.name} theme...`);
        
        // Create preview image
        const canvas = await createPreview(800, 400, theme);
        const buffer = canvas.toBuffer('image/png');
        
        // Save preview image
        await fs.writeFile(
            path.join(previewsDir, `${theme.name}.png`),
            buffer
        );
        
        // Create thumbnail
        const thumbCanvas = await createPreview(400, 200, theme);
        const thumbBuffer = thumbCanvas.toBuffer('image/png');
        
        // Save thumbnail
        await fs.writeFile(
            path.join(previewsDir, `${theme.name}-thumb.png`),
            thumbBuffer
        );
    }
    
    console.log('Preview images generated successfully!');
}

// Export the generate function
module.exports = { generatePreviews };

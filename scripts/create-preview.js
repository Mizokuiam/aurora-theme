const { createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

async function createPreview() {
    // Create a 1200x630 canvas (good size for social previews)
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1b26';
    ctx.fillRect(0, 0, 1200, 630);

    // Add aurora-like gradient
    const gradient = ctx.createLinearGradient(600, 0, 600, 630);
    gradient.addColorStop(0, '#7aa2f7');
    gradient.addColorStop(0.5, '#bb9af7');
    gradient.addColorStop(1, '#7dcfff');

    // Draw some code-like elements
    ctx.fillStyle = '#24283b';
    for (let i = 0; i < 10; i++) {
        ctx.fillRect(100, 100 + i * 40, Math.random() * 400 + 400, 24);
    }

    // Add glow effect
    ctx.shadowColor = '#7aa2f7';
    ctx.shadowBlur = 30;
    ctx.fillStyle = gradient;
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Aurora Theme Pro', 600, 200);
    
    ctx.font = '36px Arial';
    ctx.fillText('A Premium Developer Experience', 600, 280);

    // Ensure directory exists
    await fs.ensureDir(path.join(__dirname, '../assets/previews'));

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(path.join(__dirname, '../assets/previews/aurora-default.png'), buffer);
}

createPreview().catch(console.error);

const { createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

async function createEditorIcon(name, color) {
    const size = 64;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1b26';
    ctx.fillRect(0, 0, size, size);

    // Draw icon
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    switch (name) {
        case 'vscode':
            // Draw curly braces
            ctx.font = 'bold 36px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('{ }', size/2, size/2);
            break;

        case 'jetbrains':
            // Draw diamond shape
            ctx.beginPath();
            ctx.moveTo(size/2, 12);
            ctx.lineTo(size-12, size/2);
            ctx.lineTo(size/2, size-12);
            ctx.lineTo(12, size/2);
            ctx.closePath();
            ctx.stroke();
            break;

        case 'sublime':
            // Draw square brackets
            ctx.font = 'bold 36px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('[ ]', size/2, size/2);
            break;

        case 'atom':
            // Draw 26B square
            ctx.font = '24px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('26', size/2, size/2 - 8);
            ctx.fillText('B', size/2, size/2 + 16);
            break;
    }

    return canvas;
}

async function generateEditorIcons() {
    const imagesDir = path.join(__dirname, '../marketing/images');
    await fs.ensureDir(imagesDir);

    const editors = [
        { name: 'vscode', color: '#7aa2f7' },
        { name: 'jetbrains', color: '#bb9af7' },
        { name: 'sublime', color: '#7dcfff' },
        { name: 'atom', color: '#9ece6a' }
    ];

    for (const editor of editors) {
        console.log(`Generating icon for ${editor.name}...`);
        const canvas = await createEditorIcon(editor.name, editor.color);
        await fs.writeFile(
            path.join(imagesDir, `${editor.name}.png`),
            canvas.toBuffer('image/png')
        );
    }

    console.log('Editor icons generated successfully!');
}

generateEditorIcons().catch(console.error);

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
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let icon;
    switch (name) {
        case 'vscode':
            icon = '{}';
            break;
        case 'jetbrains':
            icon = '⬡';
            break;
        case 'sublime':
            icon = '⬒';
            break;
        case 'atom':
            icon = '⚛';
            break;
        default:
            icon = '?';
    }

    ctx.fillText(icon, size/2, size/2);

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

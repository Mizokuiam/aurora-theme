const fs = require('fs-extra');
const path = require('path');

async function setupDirectories() {
    const baseDir = path.join(__dirname, '../marketing/images');
    const dirs = [
        'product',
        'product/screenshots',
        'social'
    ];

    for (const dir of dirs) {
        const fullPath = path.join(baseDir, dir);
        await fs.ensureDir(fullPath);
        console.log(`Created directory: ${fullPath}`);
    }
}

setupDirectories().catch(console.error);

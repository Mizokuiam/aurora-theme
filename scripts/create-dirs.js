const fs = require('fs-extra');
const path = require('path');

async function createDirectories() {
    const dirs = [
        'src/themes/jetbrains',
        'src/themes/sublime',
        'src/themes/atom',
        'docs/installation',
        'docs/customization',
        'docs/contributing',
        'test'
    ];

    for (const dir of dirs) {
        await fs.ensureDir(path.join(__dirname, '..', dir));
        console.log(`Created directory: ${dir}`);
    }
}

createDirectories().catch(console.error);

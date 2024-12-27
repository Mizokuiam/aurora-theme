const fs = require('fs-extra');
const path = require('path');

const THEME_VARIANTS = ['default', 'storm', 'night', 'moonlight', 'sunset'];
const REQUIRED_PREVIEWS = {
    'vscode': ['python', 'javascript'],
    'jetbrains': ['main'],
    'terminal': ['main']
};

const REQUIRED_WALLPAPERS = {
    'desktop': ['4k', '2k', 'fhd'],
    'mobile': ['iphone', 'android'],
    'watch': ['apple', 'wear']
};

async function verifyAssets() {
    const missingAssets = {
        previews: [],
        wallpapers: []
    };

    // Check previews
    for (const variant of THEME_VARIANTS) {
        for (const [editor, types] of Object.entries(REQUIRED_PREVIEWS)) {
            for (const type of types) {
                const previewPath = path.join(
                    __dirname,
                    `../assets/previews/${editor}/${variant}-${type}.png`
                );
                if (!await fs.pathExists(previewPath)) {
                    missingAssets.previews.push(`${editor}/${variant}-${type}.png`);
                }
            }
        }
    }

    // Check wallpapers
    for (const variant of THEME_VARIANTS) {
        for (const [device, sizes] of Object.entries(REQUIRED_WALLPAPERS)) {
            for (const size of sizes) {
                const wallpaperPath = path.join(
                    __dirname,
                    `../assets/wallpapers/${device}/${variant}-${size}.png`
                );
                if (!await fs.pathExists(wallpaperPath)) {
                    missingAssets.wallpapers.push(`${device}/${variant}-${size}.png`);
                }
            }
        }
    }

    // Report results
    console.log('Asset Verification Report\n');
    
    if (missingAssets.previews.length === 0 && missingAssets.wallpapers.length === 0) {
        console.log('✅ All required assets are present!');
        return;
    }

    if (missingAssets.previews.length > 0) {
        console.log('Missing Preview Images:');
        missingAssets.previews.forEach(preview => console.log(`❌ ${preview}`));
        console.log();
    }

    if (missingAssets.wallpapers.length > 0) {
        console.log('Missing Wallpapers:');
        missingAssets.wallpapers.forEach(wallpaper => console.log(`❌ ${wallpaper}`));
    }

    process.exit(1);
}

verifyAssets().catch(console.error);

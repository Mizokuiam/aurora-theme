const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

async function createPackage(tier) {
    const output = fs.createWriteStream(path.join(__dirname, `../dist/aurora-theme-${tier}.zip`));
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', () => {
        console.log(`${tier} package created: ${archive.pointer()} bytes`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Add common files
    archive.directory('dist/vscode/', 'vscode');
    archive.directory('dist/jetbrains/', 'jetbrains');
    archive.directory('dist/sublime/', 'sublime');
    archive.directory('marketing/images/wallpapers/', 'wallpapers');
    archive.file('README.md', { name: 'README.md' });
    archive.file('LICENSE', { name: 'LICENSE' });
    archive.file('marketing/gumroad/welcome.md', { name: 'WELCOME.md' });

    // Add tier-specific files
    if (tier === 'pro' || tier === 'team') {
        archive.file('docs/color-customization.md', { name: 'color-customization.md' });
        archive.directory('wallpapers/4k/', 'wallpapers/4k');
    }

    if (tier === 'team') {
        archive.file('docs/team-management.md', { name: 'team-management.md' });
    }

    await archive.finalize();
}

async function createAllPackages() {
    await fs.ensureDir(path.join(__dirname, '../dist'));
    
    console.log('Creating packages...');
    await createPackage('personal');
    await createPackage('pro');
    await createPackage('team');
    console.log('All packages created!');
}

createAllPackages().catch(console.error);

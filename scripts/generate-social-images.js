const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateSocialCard() {
    const width = 1200;
    const height = 630; // Twitter card size
    
    // Create SVG with gradient background and text
    const svg = `
        <svg width="${width}" height="${height}">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#24283b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1b26;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)"/>
            <text x="${width/2}" y="${height/2-50}" 
                  font-family="Arial" font-size="72" fill="#7aa2f7" 
                  text-anchor="middle" font-weight="bold">
                Aurora Theme
            </text>
            <text x="${width/2}" y="${height/2+50}" 
                  font-family="Arial" font-size="36" fill="#c0caf5" 
                  text-anchor="middle">
                A Beautiful Theme for Code Editors
            </text>
            <text x="${width/2}" y="${height/2+120}" 
                  font-family="Arial" font-size="24" fill="#a9b1d6" 
                  text-anchor="middle">
                VS Code • JetBrains • Sublime Text
            </text>
        </svg>
    `;

    // Create image from SVG
    const final = await sharp(Buffer.from(svg))
        .png()
        .toBuffer();

    // Save the image
    const outputDir = path.join(__dirname, '../marketing/images/social');
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'social-card.png'), final);
    console.log('Social card generated!');
}

// Generate social media images
generateSocialCard().catch(console.error);

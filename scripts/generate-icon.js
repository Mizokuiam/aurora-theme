const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateIcon() {
    // Icon size (VS Code recommends 128x128)
    const size = 128;
    
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Background gradient -->
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#24283b;stop-opacity:1" />
                </linearGradient>
                
                <!-- Aurora glow effects -->
                <radialGradient id="auroraGlow1" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:#7aa2f7;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#7aa2f7;stop-opacity:0" />
                </radialGradient>
                
                <radialGradient id="auroraGlow2" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
                    <stop offset="0%" style="stop-color:#bb9af7;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#bb9af7;stop-opacity:0" />
                </radialGradient>
                
                <!-- Glass effect -->
                <filter id="glass">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"/>
                </filter>
            </defs>
            
            <!-- Background -->
            <rect width="${size}" height="${size}" fill="url(#bgGrad)" rx="28" />
            
            <!-- Aurora effects -->
            <circle cx="${size/2}" cy="${size/2}" r="${size/1.5}" fill="url(#auroraGlow1)" />
            <circle cx="${size/2}" cy="${size/2.5}" r="${size/1.8}" fill="url(#auroraGlow2)" />
            
            <!-- Modern A letter -->
            <path d="
                M ${size/2} ${size*0.25}
                L ${size*0.75} ${size*0.75}
                L ${size*0.6} ${size*0.75}
                L ${size/2} ${size*0.45}
                L ${size*0.4} ${size*0.75}
                L ${size*0.25} ${size*0.75}
                Z
            " fill="#ffffff" filter="url(#glass)" />
            
            <!-- Subtle reflection -->
            <rect x="${size*0.2}" y="${size*0.2}" width="${size*0.6}" height="${size*0.1}" 
                  fill="white" opacity="0.1" rx="4" />
        </svg>
    `;

    // Generate PNG with high quality settings
    const final = await sharp(Buffer.from(svg))
        .png({
            quality: 100,
            compressionLevel: 9
        })
        .toBuffer();

    // Save the icon
    const outputDir = path.join(__dirname, '../assets');
    await fs.ensureDir(outputDir);
    
    await fs.writeFile(
        path.join(outputDir, 'icon.png'),
        final
    );
    
    console.log('Generated icon in assets/icon.png');
}

generateIcon().catch(console.error);

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateThumbnail() {
    // Square format, 1200x1200 for high quality
    const size = 1200;
    
    // Create SVG with modern design
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Gradient for background -->
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#24283b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1b26;stop-opacity:1" />
                </linearGradient>
                
                <!-- Aurora glow gradients -->
                <radialGradient id="auroraGlow1" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:#7aa2f7;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#7aa2f7;stop-opacity:0" />
                </radialGradient>
                
                <radialGradient id="auroraGlow2" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:#bb9af7;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#bb9af7;stop-opacity:0" />
                </radialGradient>
                
                <!-- Modern grid pattern -->
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2f3549" stroke-width="0.5" opacity="0.3"/>
                </pattern>
                
                <!-- Glass effect -->
                <filter id="glass">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.3 0"/>
                </filter>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="url(#bgGrad)"/>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            
            <!-- Aurora glow effects -->
            <circle cx="${size/2}" cy="${size/2}" r="${size/1.5}" fill="url(#auroraGlow1)"/>
            <circle cx="${size/2}" cy="${size/2}" r="${size/1.8}" fill="url(#auroraGlow2)"/>
            
            <!-- Glass card effect -->
            <rect x="${size*0.15}" y="${size*0.2}" width="${size*0.7}" height="${size*0.6}" 
                  rx="30" fill="#ffffff10" filter="url(#glass)"/>
            
            <!-- Main title with modern typography -->
            <text x="${size/2}" y="${size*0.4}" 
                  font-family="Arial" font-size="140" fill="#7aa2f7" 
                  text-anchor="middle" font-weight="bold"
                  filter="url(#glass)">
                Aurora Pro
            </text>
            
            <!-- Subtitle -->
            <text x="${size/2}" y="${size*0.5}" 
                  font-family="Arial" font-size="60" fill="#c0caf5" 
                  text-anchor="middle" font-weight="300"
                  opacity="0.9">
                Premium Developer Experience
            </text>
            
            <!-- Feature highlights -->
            <g transform="translate(${size/2}, ${size*0.6})" text-anchor="middle">
                <text y="0" font-family="Arial" font-size="32" fill="#a9b1d6" opacity="0.8">
                    11 Unique Themes • Multi-IDE Support • Custom Wallpapers
                </text>
            </g>
            
            <!-- Modern badge -->
            <g transform="translate(${size/2}, ${size*0.75})">
                <rect x="-100" y="-40" width="200" height="80" 
                      fill="#7aa2f7" rx="40" opacity="0.9"/>
                <text x="0" y="8" 
                      font-family="Arial" font-size="36" fill="white" 
                      text-anchor="middle" font-weight="bold">
                    Get Pro Now
                </text>
            </g>
        </svg>
    `;

    // Generate PNG with high quality settings
    const final = await sharp(Buffer.from(svg))
        .png({
            quality: 100,
            compressionLevel: 9
        })
        .toBuffer();

    // Save the image
    const outputDir = path.join(__dirname, '../marketing/images');
    await fs.ensureDir(outputDir);
    
    await fs.writeFile(
        path.join(outputDir, 'aurora-pro-banner.png'),
        final
    );
    
    console.log('Generated Aurora Pro banner in marketing/images/aurora-pro-banner.png');
}

generateThumbnail().catch(console.error);

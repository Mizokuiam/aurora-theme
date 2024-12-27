const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateThumbnail() {
    // Square format, 1200x1200 for high quality
    const size = 1200;
    
    // Create SVG with optimized layout for square thumbnail
    const svg = `
        <svg width="${size}" height="${size}">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#24283b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1b26;stop-opacity:1" />
                </linearGradient>
                <!-- Grid pattern for background -->
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2f3549" stroke-width="0.5"/>
                </pattern>
            </defs>
            
            <!-- Background with gradient -->
            <rect width="100%" height="100%" fill="url(#grad)"/>
            
            <!-- Grid overlay -->
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3"/>
            
            <!-- Aurora-like glow effect -->
            <circle cx="${size/2}" cy="${size/2}" r="400" 
                    fill="none" stroke="#7aa2f7" stroke-width="2" 
                    opacity="0.3"/>
            <circle cx="${size/2}" cy="${size/2}" r="300" 
                    fill="none" stroke="#bb9af7" stroke-width="2" 
                    opacity="0.3"/>
            
            <!-- Main title -->
            <text x="${size/2}" y="${size/2-100}" 
                  font-family="Arial" font-size="120" fill="#7aa2f7" 
                  text-anchor="middle" font-weight="bold">
                Aurora
            </text>
            
            <!-- Theme word -->
            <text x="${size/2}" y="${size/2+20}" 
                  font-family="Arial" font-size="100" fill="#c0caf5" 
                  text-anchor="middle" font-weight="bold">
                Theme
            </text>
            
            <!-- Supported editors -->
            <text x="${size/2}" y="${size/2+140}" 
                  font-family="Arial" font-size="36" fill="#a9b1d6" 
                  text-anchor="middle">
                VS Code • JetBrains • Sublime Text
            </text>
            
            <!-- Price tag -->
            <g transform="translate(${size/2}, ${size-200})">
                <rect x="-80" y="-40" width="160" height="80" 
                      fill="#7aa2f7" rx="12"/>
                <text x="0" y="12" 
                      font-family="Arial" font-size="48" fill="white" 
                      text-anchor="middle" font-weight="bold">
                    $19
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

    // Save thumbnails for each variant
    const outputDir = path.join(__dirname, '../marketing/images/thumbnails');
    await fs.ensureDir(outputDir);
    
    // Save main thumbnail
    await fs.writeFile(
        path.join(outputDir, 'thumbnail.png'),
        final
    );
    
    // Create variants with different prices
    const prices = ['19', '29', '99'];
    const variants = ['personal', 'pro', 'team'];
    
    for (let i = 0; i < variants.length; i++) {
        const variantSvg = svg.replace('$19', `$${prices[i]}`);
        const variantBuffer = await sharp(Buffer.from(variantSvg))
            .png({
                quality: 100,
                compressionLevel: 9
            })
            .toBuffer();
            
        await fs.writeFile(
            path.join(outputDir, `thumbnail-${variants[i]}.png`),
            variantBuffer
        );
    }
    
    console.log('Generated square thumbnails (1200x1200) in marketing/images/thumbnails/');
}

generateThumbnail().catch(console.error);

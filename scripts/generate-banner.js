const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateBanner() {
    // Square format, 1200x1200 for high quality
    const size = 1200;
    
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Modern gradients -->
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#24283b;stop-opacity:1" />
                </linearGradient>
                
                <!-- Aurora effects -->
                <radialGradient id="auroraGlow1" cx="30%" cy="30%" r="100%" fx="30%" fy="30%">
                    <stop offset="0%" style="stop-color:#7aa2f7;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#7aa2f7;stop-opacity:0" />
                </radialGradient>
                
                <radialGradient id="auroraGlow2" cx="70%" cy="60%" r="90%" fx="70%" fy="60%">
                    <stop offset="0%" style="stop-color:#bb9af7;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#bb9af7;stop-opacity:0" />
                </radialGradient>
                
                <!-- Glass card effect -->
                <filter id="glass">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.3 0"/>
                </filter>
                
                <!-- Text shadow -->
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"/>
                </filter>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="url(#bgGrad)"/>
            
            <!-- Modern geometric patterns -->
            <path d="M0 0 L${size} 0 L${size} ${size*0.3} Q${size*0.7} ${size*0.4} ${size*0.3} ${size*0.5} L0 ${size*0.7} Z" 
                  fill="#2f3549" opacity="0.1"/>
            
            <!-- Aurora glow effects -->
            <circle cx="${size*0.3}" cy="${size*0.3}" r="${size*0.8}" fill="url(#auroraGlow1)"/>
            <circle cx="${size*0.7}" cy="${size*0.6}" r="${size*0.7}" fill="url(#auroraGlow2)"/>
            
            <!-- Glass cards -->
            <g transform="translate(${size*0.1}, ${size*0.2})">
                <rect width="${size*0.8}" height="${size*0.6}" rx="30" 
                      fill="#ffffff08" filter="url(#glass)"/>
                      
                <!-- Content -->
                <g transform="translate(${size*0.4}, ${size*0.15})">
                    <!-- Main title -->
                    <text x="0" y="0" 
                          font-family="Arial" font-size="120" fill="#ffffff" 
                          text-anchor="middle" font-weight="bold"
                          filter="url(#glow)">
                        Aurora Theme Pro
                    </text>
                    
                    <!-- Subtitle -->
                    <text x="0" y="80" 
                          font-family="Arial" font-size="48" fill="#c0caf5" 
                          text-anchor="middle" font-weight="300"
                          opacity="0.9">
                        Premium Developer Experience
                    </text>
                    
                    <!-- Feature cards -->
                    <g transform="translate(0, 180)">
                        <!-- Card 1 -->
                        <rect x="-350" y="0" width="200" height="100" rx="15" 
                              fill="#ffffff10" filter="url(#glass)"/>
                        <text x="-250" y="45" 
                              font-family="Arial" font-size="24" fill="#7aa2f7" 
                              text-anchor="middle">
                            11 Unique
                            Themes
                        </text>
                        
                        <!-- Card 2 -->
                        <rect x="-100" y="0" width="200" height="100" rx="15" 
                              fill="#ffffff10" filter="url(#glass)"/>
                        <text x="0" y="45" 
                              font-family="Arial" font-size="24" fill="#bb9af7" 
                              text-anchor="middle">
                            Multi-IDE
                            Support
                        </text>
                        
                        <!-- Card 3 -->
                        <rect x="150" y="0" width="200" height="100" rx="15" 
                              fill="#ffffff10" filter="url(#glass)"/>
                        <text x="250" y="45" 
                              font-family="Arial" font-size="24" fill="#7dcfff" 
                              text-anchor="middle">
                            Custom
                            Wallpapers
                        </text>
                    </g>
                </g>
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

generateBanner().catch(console.error);

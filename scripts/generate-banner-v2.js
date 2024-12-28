const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

async function generateBanner() {
    // Square format, 1200x1200 for high quality
    const size = 1200;
    
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Rich background gradient -->
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1b26;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#24283b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1b26;stop-opacity:1" />
                </linearGradient>
                
                <!-- Intense aurora effects -->
                <radialGradient id="auroraGlow1" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                    <stop offset="0%" style="stop-color:#7aa2f7;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#7aa2f7;stop-opacity:0" />
                </radialGradient>
                
                <radialGradient id="auroraGlow2" cx="20%" cy="30%" r="80%" fx="20%" fy="30%">
                    <stop offset="0%" style="stop-color:#bb9af7;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#bb9af7;stop-opacity:0" />
                </radialGradient>
                
                <radialGradient id="auroraGlow3" cx="80%" cy="60%" r="90%" fx="80%" fy="60%">
                    <stop offset="0%" style="stop-color:#7dcfff;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#7dcfff;stop-opacity:0" />
                </radialGradient>
                
                <!-- Enhanced glass effects -->
                <filter id="glass">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"/>
                </filter>
                
                <!-- Text effects -->
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"/>
                </filter>
                
                <!-- 3D lighting effect -->
                <filter id="bevel">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                    <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lighting-color="#white" result="specOut">
                        <fePointLight x="-5000" y="-10000" z="20000"/>
                    </feSpecularLighting>
                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
                </filter>
            </defs>
            
            <!-- Background with depth -->
            <rect width="100%" height="100%" fill="url(#bgGrad)"/>
            
            <!-- Dynamic aurora effects -->
            <g opacity="0.8">
                <path d="M0 0 C ${size*0.3} ${size*0.2} ${size*0.7} ${size*0.4} ${size} ${size*0.3}" 
                      stroke="url(#auroraGlow1)" stroke-width="200" fill="none"/>
                <path d="M0 ${size*0.3} C ${size*0.4} ${size*0.5} ${size*0.6} ${size*0.2} ${size} ${size*0.4}" 
                      stroke="url(#auroraGlow2)" stroke-width="180" fill="none"/>
                <path d="M0 ${size*0.6} C ${size*0.5} ${size*0.4} ${size*0.5} ${size*0.8} ${size} ${size*0.7}" 
                      stroke="url(#auroraGlow3)" stroke-width="160" fill="none"/>
            </g>
            
            <!-- Main content container -->
            <g transform="translate(${size*0.1}, ${size*0.2})">
                <!-- 3D glass panel -->
                <rect width="${size*0.8}" height="${size*0.6}" rx="40" 
                      fill="#ffffff10" filter="url(#glass)"
                      transform="skewY(-5)"/>
                
                <!-- Content -->
                <g transform="translate(${size*0.4}, ${size*0.2})">
                    <!-- Title with 3D effect -->
                    <g transform="translate(0, 0)" filter="url(#bevel)">
                        <text x="0" y="0" 
                              font-family="Arial" font-size="130" fill="#ffffff" 
                              text-anchor="middle" font-weight="bold"
                              filter="url(#glow)">
                            Aurora Pro
                        </text>
                    </g>
                    
                    <!-- Dynamic subtitle -->
                    <text x="0" y="100" 
                          font-family="Arial" font-size="54" fill="#c0caf5" 
                          text-anchor="middle" font-weight="300"
                          opacity="0.95">
                        Premium Theme Experience
                    </text>
                    
                    <!-- Feature highlights with modern cards -->
                    <g transform="translate(0, 200)">
                        <!-- Feature grid -->
                        <g transform="translate(-300, 0)">
                            <!-- Card 1 -->
                            <rect width="180" height="90" rx="20" 
                                  fill="#ffffff15" filter="url(#glass)"
                                  transform="skewX(-10)"/>
                            <text x="90" y="40" 
                                  font-family="Arial" font-size="22" fill="#7aa2f7" 
                                  text-anchor="middle" font-weight="bold">
                                11 Unique
                            </text>
                            <text x="90" y="65" 
                                  font-family="Arial" font-size="22" fill="#7aa2f7" 
                                  text-anchor="middle" font-weight="bold">
                                Themes
                            </text>
                        </g>
                        
                        <g transform="translate(0, 0)">
                            <!-- Card 2 -->
                            <rect width="180" height="90" rx="20" 
                                  fill="#ffffff15" filter="url(#glass)"
                                  transform="skewX(-10)"/>
                            <text x="90" y="40" 
                                  font-family="Arial" font-size="22" fill="#bb9af7" 
                                  text-anchor="middle" font-weight="bold">
                                Multi-IDE
                            </text>
                            <text x="90" y="65" 
                                  font-family="Arial" font-size="22" fill="#bb9af7" 
                                  text-anchor="middle" font-weight="bold">
                                Support
                            </text>
                        </g>
                        
                        <g transform="translate(300, 0)">
                            <!-- Card 3 -->
                            <rect width="180" height="90" rx="20" 
                                  fill="#ffffff15" filter="url(#glass)"
                                  transform="skewX(-10)"/>
                            <text x="90" y="40" 
                                  font-family="Arial" font-size="22" fill="#7dcfff" 
                                  text-anchor="middle" font-weight="bold">
                                Custom
                            </text>
                            <text x="90" y="65" 
                                  font-family="Arial" font-size="22" fill="#7dcfff" 
                                  text-anchor="middle" font-weight="bold">
                                Wallpapers
                            </text>
                        </g>
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

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a 128x128 canvas
const canvas = createCanvas(128, 128);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#1a1b26';
ctx.fillRect(0, 0, 128, 128);

// Create gradient
const gradient = ctx.createLinearGradient(64, 20, 64, 108);
gradient.addColorStop(0, '#7aa2f7');
gradient.addColorStop(0.5, '#bb9af7');
gradient.addColorStop(1, '#7dcfff');

// Draw outer ring
ctx.beginPath();
ctx.arc(64, 64, 40, 0, Math.PI * 2);
ctx.lineWidth = 8;
ctx.strokeStyle = gradient;
ctx.stroke();

// Draw inner circle
ctx.beginPath();
ctx.arc(64, 64, 24, 0, Math.PI * 2);
ctx.fillStyle = gradient;
ctx.fill();

// Add some glow effect
ctx.shadowColor = '#7aa2f7';
ctx.shadowBlur = 15;
ctx.beginPath();
ctx.arc(64, 64, 20, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(122, 162, 247, 0.3)';
ctx.fill();

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../dist/vscode/icon.png'), buffer);

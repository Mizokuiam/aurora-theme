const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

async function buildMarketing() {
    const marketingDir = path.join(__dirname, '../marketing');
    const distDir = path.join(__dirname, '../dist/marketing');
    const wallpaperDir = path.join(__dirname, '../assets/wallpapers');
    
    // Create dist directory
    await fs.ensureDir(distDir);
    
    // Copy and minify HTML
    const html = await fs.readFile(path.join(marketingDir, 'index.html'), 'utf8');
    const minifiedHtml = htmlMinifier.minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });
    await fs.writeFile(path.join(distDir, 'index.html'), minifiedHtml);
    
    // Copy and minify CSS
    const css = await fs.readFile(path.join(marketingDir, 'styles.css'), 'utf8');
    const minifiedCss = new CleanCSS({}).minify(css).styles;
    await fs.writeFile(path.join(distDir, 'styles.css'), minifiedCss);
    
    // Copy and minify JavaScript
    const js = await fs.readFile(path.join(marketingDir, 'script.js'), 'utf8');
    const minifiedJs = (await minify(js)).code;
    await fs.writeFile(path.join(distDir, 'script.js'), minifiedJs);
    
    // Copy images
    await fs.copy(
        path.join(marketingDir, 'images'),
        path.join(distDir, 'images'),
        { overwrite: true }
    );
    
    // Copy preview images
    await fs.copy(
        path.join(__dirname, '../assets/previews'),
        path.join(distDir, 'previews'),
        { overwrite: true }
    );

    // Copy wallpapers
    const wallpaperDistDir = path.join(distDir, 'wallpapers');
    await fs.copy(wallpaperDir, wallpaperDistDir, { overwrite: true });
    
    console.log('Marketing site built successfully!');
}

// Run the build
buildMarketing().catch(console.error);

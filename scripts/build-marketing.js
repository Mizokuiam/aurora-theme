const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

async function buildMarketing() {
    const marketingDir = path.join(__dirname, '../marketing');
    const distDir = path.join(__dirname, '../dist/marketing');
    const wallpaperDir = path.join(__dirname, '../assets/wallpapers');
    
    // Create dist directory and subdirectories
    await fs.ensureDir(distDir);
    await fs.ensureDir(path.join(distDir, 'previews'));
    await fs.ensureDir(path.join(distDir, 'wallpapers'));
    await fs.ensureDir(path.join(distDir, 'images'));
    
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
    if (await fs.pathExists(path.join(marketingDir, 'images'))) {
        await fs.copy(
            path.join(marketingDir, 'images'),
            path.join(distDir, 'images'),
            { overwrite: true }
        );
    }
    
    // Copy preview images
    if (await fs.pathExists(path.join(marketingDir, 'previews'))) {
        await fs.copy(
            path.join(marketingDir, 'previews'),
            path.join(distDir, 'previews'),
            { overwrite: true }
        );
    }
    
    // Copy wallpapers
    if (await fs.pathExists(wallpaperDir)) {
        await fs.copy(
            wallpaperDir,
            path.join(distDir, 'wallpapers'),
            { overwrite: true }
        );
    }
    
    console.log('Marketing site built successfully!');
}

// Export the build function
module.exports = { buildMarketing };

const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

async function buildMarketing() {
    const srcDir = path.join(__dirname, '../src/marketing');
    const distDir = path.join(__dirname, '../dist');
    
    // Create dist directory and subdirectories
    await fs.ensureDir(distDir);
    await fs.ensureDir(path.join(distDir, 'marketing'));
    await fs.ensureDir(path.join(distDir, 'marketing/images'));
    
    // Copy and minify HTML
    console.log('Building marketing HTML...');
    const html = await fs.readFile(path.join(srcDir, 'index.html'), 'utf8');
    const minifiedHtml = htmlMinifier.minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });
    await fs.writeFile(path.join(distDir, 'marketing/index.html'), minifiedHtml);
    
    // Copy and minify CSS
    console.log('Building marketing CSS...');
    const css = await fs.readFile(path.join(srcDir, 'styles.css'), 'utf8');
    const minifiedCss = new CleanCSS({}).minify(css).styles;
    await fs.writeFile(path.join(distDir, 'marketing/styles.css'), minifiedCss);
    
    // Copy images if they exist
    if (await fs.pathExists(path.join(srcDir, 'images'))) {
        console.log('Copying marketing images...');
        await fs.copy(
            path.join(srcDir, 'images'),
            path.join(distDir, 'marketing/images'),
            { overwrite: true }
        );
    }
    
    console.log('Marketing site built successfully!');
}

// Run the build if called directly
if (require.main === module) {
    buildMarketing().catch(console.error);
}

// Export the build function
module.exports = { buildMarketing };

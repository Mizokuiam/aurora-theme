const fs = require('fs-extra');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

async function buildMarketing() {
    console.log('Starting marketing site build...');
    
    // Set up paths
    const srcDir = path.join(__dirname, '../marketing');
    const distDir = path.join(__dirname, '../dist/marketing');
    
    // Ensure source directory exists
    if (!await fs.pathExists(srcDir)) {
        throw new Error(`Marketing source directory not found: ${srcDir}`);
    }
    
    // Create dist directory
    console.log('Creating dist directory...');
    await fs.ensureDir(distDir);
    
    // Copy and minify HTML
    console.log('Building marketing HTML...');
    const htmlPath = path.join(srcDir, 'index.html');
    if (!await fs.pathExists(htmlPath)) {
        throw new Error(`HTML file not found: ${htmlPath}`);
    }
    const html = await fs.readFile(htmlPath, 'utf8');
    const minifiedHtml = htmlMinifier.minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });
    await fs.writeFile(path.join(distDir, 'index.html'), minifiedHtml);
    
    // Copy and minify CSS
    console.log('Building marketing CSS...');
    const cssPath = path.join(srcDir, 'styles.css');
    if (!await fs.pathExists(cssPath)) {
        throw new Error(`CSS file not found: ${cssPath}`);
    }
    const css = await fs.readFile(cssPath, 'utf8');
    const minifiedCss = new CleanCSS({}).minify(css).styles;
    await fs.writeFile(path.join(distDir, 'styles.css'), minifiedCss);
    
    // Copy images if they exist
    const imagesDir = path.join(srcDir, 'images');
    if (await fs.pathExists(imagesDir)) {
        console.log('Copying marketing images...');
        await fs.copy(
            imagesDir,
            path.join(distDir, 'images'),
            { overwrite: true }
        );
    }
    
    // List contents of dist directory
    console.log('\nMarketing site build complete. Contents of dist/marketing:');
    const files = await fs.readdir(distDir);
    for (const file of files) {
        const stats = await fs.stat(path.join(distDir, file));
        console.log(`- ${file} (${stats.size} bytes)`);
    }
}

// Run the build if called directly
if (require.main === module) {
    buildMarketing().catch(err => {
        console.error('Build failed:', err);
        process.exit(1);
    });
}

// Export the build function
module.exports = { buildMarketing };

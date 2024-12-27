const { execSync } = require('child_process');
const path = require('path');

async function generateAllImages() {
    console.log('Starting image generation...');

    try {
        // Generate marketing images
        console.log('\nGenerating marketing images...');
        execSync('node scripts/generate-marketing-images.js', { stdio: 'inherit' });

        // Generate social images
        console.log('\nGenerating social images...');
        execSync('node scripts/generate-social-images.js', { stdio: 'inherit' });

        console.log('\nAll images generated successfully!');
        
        // List generated files
        console.log('\nGenerated files:');
        const dirs = [
            'marketing/images/product',
            'marketing/images/product/screenshots',
            'marketing/images/social'
        ];
        
        dirs.forEach(dir => {
            console.log(`\nFiles in ${dir}:`);
            const files = execSync(`dir "${path.join(__dirname, '..', dir)}"`, { encoding: 'utf8' });
            console.log(files);
        });
    } catch (error) {
        console.error('Error generating images:', error.message);
        process.exit(1);
    }
}

generateAllImages().catch(console.error);

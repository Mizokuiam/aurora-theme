const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function packageVSCode() {
    const vscodeDir = path.join(__dirname, '../dist/vscode');
    
    // Ensure vsce is installed
    try {
        await new Promise((resolve, reject) => {
            exec('vsce --version', (error) => {
                if (error) {
                    console.log('Installing vsce...');
                    exec('npm install -g @vscode/vsce', (err, stdout, stderr) => {
                        if (err) reject(err);
                        else resolve();
                    });
                } else {
                    resolve();
                }
            });
        });

        // Package the extension
        console.log('Packaging VS Code extension...');
        await new Promise((resolve, reject) => {
            exec('vsce package', {
                cwd: vscodeDir
            }, (error, stdout, stderr) => {
                if (error) reject(error);
                else {
                    console.log(stdout);
                    resolve();
                }
            });
        });

        console.log('VS Code package created successfully!');
    } catch (error) {
        console.error('Error packaging VS Code extension:', error);
        process.exit(1);
    }
}

packageVSCode();

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, '../dist/marketing');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Convert URL to file path, using index.html for root
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Get file extension
    const ext = path.extname(filePath);
    
    // Set content type
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                res.statusCode = 404;
                res.end('404 Not Found');
            } else {
                console.error(`Error reading file: ${err}`);
                res.statusCode = 500;
                res.end('500 Internal Server Error');
            }
            return;
        }
        
        res.statusCode = 200;
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from ${DIST_DIR}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // Parse URL to remove query parameters
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  
  let filePath = '.' + (pathname === '/' ? '/index.html' : pathname);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  const isHTML = extname === '.html' || req.url === '/' || extname === '';
  const isStatic = ['.css', '.js', '.png', '.jpg', '.gif', '.svg', '.ico', '.webp'].includes(extname);

  // Mobile-friendly headers for better performance and compatibility
  const headers = {
    'Content-Type': contentType,
    'Cache-Control': isHTML ? 'no-store, no-cache, must-revalidate, proxy-revalidate' : 'public, max-age=30',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block'
  };
  
  if (isHTML) {
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';
  }

  // Add CORS headers for mobile compatibility
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, headers);
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500, headers);
        res.end('500 - Internal Server Error: ' + error.code, 'utf-8');
      }
    } else {
      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BrainWave Server running at:`);
  console.log(`   📱 Mobile: http://[YOUR_IP]:${PORT}/`);
  console.log(`   💻 Desktop: http://localhost:${PORT}/`);
  console.log(`   🌐 Network: http://0.0.0.0:${PORT}/`);
  console.log(`\n📱 Mobile Access Instructions:`);
  console.log(`   1. Find your computer's IP address`);
  console.log(`   2. Connect mobile device to same WiFi network`);
  console.log(`   3. Open browser and go to: http://[YOUR_IP]:${PORT}/`);
  console.log(`\nPress Ctrl+C to stop the server`);
});

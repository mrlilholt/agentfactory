#!/usr/bin/env node

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const startPort = Number(process.env.PORT || 5173);
const maxPort = Number(process.env.MAX_PORT || startPort + 10);
const host = process.env.HOST || '127.0.0.1';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.zip': 'application/zip'
};

function sendError(response, statusCode, message) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return contentTypes[extension] || 'application/octet-stream';
}

async function exists(filePath) {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveRequestPath(urlPathname) {
  const pathname = decodeURIComponent(urlPathname.split('?')[0]);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const absolutePath = path.resolve(rootDir, '.' + requestedPath);

  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  if (!(await exists(absolutePath))) {
    return null;
  }

  const fileStats = await stat(absolutePath);
  if (fileStats.isDirectory()) {
    const nestedIndex = path.join(absolutePath, 'index.html');
    if (await exists(nestedIndex)) {
      return nestedIndex;
    }
    return null;
  }

  return absolutePath;
}

const server = createServer(async (request, response) => {
  try {
    const method = request.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
      sendError(response, 405, 'Method Not Allowed');
      return;
    }

    const targetPath = await resolveRequestPath(request.url || '/');
    if (!targetPath) {
      sendError(response, 404, 'Not Found');
      return;
    }

    response.writeHead(200, { 'Content-Type': getContentType(targetPath) });
    if (method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(targetPath).pipe(response);
  } catch (error) {
    sendError(response, 500, 'Server Error');
  }
});

let activePort = startPort;

server.on('listening', () => {
  const localUrl = `http://${host}:${activePort}`;
  console.log(`AI Agency Builder dev server running at ${localUrl}`);
});

server.on('error', (error) => {
  if (error && error.code === 'EADDRINUSE') {
    const previousPort = activePort;
    activePort += 1;
    if (activePort > maxPort) {
      console.error(
        `Port ${previousPort} is in use and no free port was found in ${startPort}-${maxPort}.`
      );
      process.exit(1);
    }

    console.warn(`Port ${previousPort} is in use. Trying ${activePort}...`);
    server.listen(activePort, host);
    return;
  }

  console.error(error);
  process.exit(1);
});

server.listen(activePort, host);

// ABOUTME: The smallest service that proves the whole path works end to end.
// ABOUTME: No dependencies, so a clone builds and deploys without an install step.

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const page = readFileSync(join(here, 'public', 'index.html'), 'utf8');

// Cloud Run supplies PORT. Binding to 0.0.0.0 rather than localhost is the
// difference between a container that works here and one that works there.
const port = process.env.PORT || 8080;

createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page.replace('{{REVISION}}', process.env.K_REVISION || 'local'));
}).listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));

const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

try {
  if (fs.existsSync(nextDir)) {
    console.log('[HydroSync Cache] Cleaning .next build directory to prevent dev/build cache collision...');
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('[HydroSync Cache] Clean complete.');
  }
} catch (err) {
  console.warn('[HydroSync Cache] Warning: could not clean .next directory:', err.message);
}


// make.fun entry: copy the committed image into the grader's output directory.
// Standard library only; runs directly on Node 22's TypeScript support.
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where the grader wants the finished image. Fall back to its documented default.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// Resolve the image next to this file, independent of the caller's cwd.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

// Validate before touching the destination so failures are clear and contained.
if (!existsSync(source)) {
  console.error(`source image not found: ${source}`);
  process.exit(1);
}
if (statSync(source).size === 0) {
  console.error(`source image is empty: ${source}`);
  process.exit(1);
}

// A fresh sandbox may not have created the output directory yet.
mkdirSync(outDir, { recursive: true });

const destination = join(outDir, 'entry.png');
copyFileSync(source, destination);

console.log(`wrote ${destination} (${statSync(destination).size} bytes)`);

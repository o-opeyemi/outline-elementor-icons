import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { deflateRawSync } from 'node:zlib';
import path from 'node:path';
import os from 'node:os';
import { root } from './build.mjs';

// Small dependency-free ZIP writer. Fixed timestamps keep builds reproducible.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
async function walk(dir) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const name = `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await walk(name));
    else files.push(name);
  }
  return files;
}
const files = ['lucide-elementor-icons.php', 'readme.txt', 'LICENSE', 'README.md', 'package.json', 'package-lock.json', ...await walk('assets'), ...await walk('licenses'), ...await walk('scripts'), ...await walk('tests')];
const local = [], central = [];
let offset = 0;
for (const file of files) {
  const name = Buffer.from(`lucide-elementor-icons/${file}`);
  const bytes = await readFile(path.join(root, file));
  const compressed = deflateRawSync(bytes);
  const crc = crc32(bytes);
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(8, 8);
  header.writeUInt16LE(33, 12); // 1980-01-01.
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(compressed.length, 18);
  header.writeUInt32LE(bytes.length, 22);
  header.writeUInt16LE(name.length, 26);
  local.push(header, name, compressed);
  const entry = Buffer.alloc(46);
  entry.writeUInt32LE(0x02014b50, 0);
  entry.writeUInt16LE(20, 4);
  entry.writeUInt16LE(20, 6);
  entry.writeUInt16LE(8, 10);
  entry.writeUInt16LE(33, 14);
  entry.writeUInt32LE(crc, 16);
  entry.writeUInt32LE(compressed.length, 20);
  entry.writeUInt32LE(bytes.length, 24);
  entry.writeUInt16LE(name.length, 28);
  entry.writeUInt32LE(offset, 42);
  central.push(entry, name);
  offset += header.length + name.length + compressed.length;
}
const directory = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(directory.length, 12);
end.writeUInt32LE(offset, 16);
const outputDir = path.resolve(process.env.LEI_OUTPUT_DIR || path.join(os.tmpdir(), 'lucide-elementor-icons-dist'));
const relativeOutput = path.relative(root, outputDir);
if (!relativeOutput || (!relativeOutput.startsWith(`..${path.sep}`) && relativeOutput !== '..' && !path.isAbsolute(relativeOutput))) {
  throw new Error('LEI_OUTPUT_DIR must be outside the plugin folder to avoid Plugin Check compressed_files errors.');
}
await mkdir(outputDir, { recursive: true });
const outputFile = path.join(outputDir, 'lucide-elementor-icons.zip');
await writeFile(outputFile, Buffer.concat([...local, directory, end]));
console.log(`Created ${outputFile}`);

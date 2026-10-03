import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
const tags = new Set(['path', 'circle', 'rect', 'line', 'ellipse', 'polyline', 'polygon']);
const attributes = new Set(['d', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'rx', 'ry', 'x1', 'x2', 'y1', 'y2', 'fill', 'points']);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderNodes(nodes) {
  return nodes.map(([tag, attrs]) => {
    if (!tags.has(tag)) throw new Error(`Unsupported SVG element: ${tag}`);
    const values = Object.entries(attrs).map(([key, value]) => {
      if (!attributes.has(key) || !['string', 'number'].includes(typeof value) || /url\s*\(/i.test(String(value))) {
        throw new Error(`Unsupported SVG attribute: ${key}`);
      }
      return `${key}="${escape(value)}"`;
    });
    return `<${tag} ${values.join(' ')} />`;
  }).join('');
}

export async function build() {
  const upstream = path.join(root, 'node_modules/lucide-static');
  const { version } = JSON.parse(await readFile(path.join(upstream, 'package.json'), 'utf8'));
  const nodes = JSON.parse(await readFile(path.join(upstream, 'icon-nodes.json'), 'utf8'));
  const names = Object.keys(nodes).sort();
  if (names.length < 100) throw new Error('Lucide catalog unexpectedly small');
  const icons = {};
  let css = '/* Generated from lucide-static; see licenses/LUCIDE.txt. */\n' +
    '.lei { display:inline-block; width:1em; height:1em; background-color:currentColor; ' +
    'font-style:normal; vertical-align:middle; -webkit-mask:var(--lei-icon) center/contain no-repeat; mask:var(--lei-icon) center/contain no-repeat; }\n';
  for (const name of names) {
    if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`Invalid icon name: ${name}`);
    icons[name] = renderNodes(nodes[name]);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
    const uri = encodeURIComponent(svg).replaceAll("'", '%27');
    css += `.lei-${name}{--lei-icon:url("data:image/svg+xml,${uri}")}\n`;
  }
  await mkdir(path.join(root, 'assets'), { recursive: true });
  await mkdir(path.join(root, 'licenses'), { recursive: true });
  await writeFile(path.join(root, 'assets/icons.json'), JSON.stringify({ version, icons }) + '\n');
  await writeFile(path.join(root, 'assets/catalog.json'), JSON.stringify({ icons: names }) + '\n');
  await writeFile(path.join(root, 'assets/editor.css'), css);
  await copyFile(path.join(upstream, 'LICENSE'), path.join(root, 'licenses/LUCIDE.txt'));
  console.log(`Built ${names.length} Lucide ${version} icons (local SVGs).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();

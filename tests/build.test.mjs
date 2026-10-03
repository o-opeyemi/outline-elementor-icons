import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { root, renderNodes } from '../scripts/build.mjs';

test('catalog, SVG data and editor previews match the locked dependency', async () => {
  const data = JSON.parse(await readFile(path.join(root, 'assets/icons.json'), 'utf8'));
  const catalog = JSON.parse(await readFile(path.join(root, 'assets/catalog.json'), 'utf8'));
  const pkg = JSON.parse(await readFile(path.join(root, 'node_modules/lucide-static/package.json'), 'utf8'));
  const css = await readFile(path.join(root, 'assets/editor.css'), 'utf8');
  assert.equal(data.version, pkg.version);
  assert.deepEqual(catalog.icons, Object.keys(data.icons));
  assert.ok(data.icons.house.includes('<path'));
  for (const name of catalog.icons) assert.ok(css.includes(`.lei-${name}{`), name);
  assert.ok(!/<script|onload=|javascript:/i.test(Object.values(data.icons).join('')));
  const license = await readFile(path.join(root, 'licenses/LUCIDE.txt'), 'utf8');
  assert.match(license, /ISC License/);
  assert.match(license, /MIT/);
});

test('upstream changes cannot silently introduce active SVG content', () => {
  assert.throws(() => renderNodes([['script', {}]]));
  assert.throws(() => renderNodes([['path', { onload: 'alert(1)' }]]));
  assert.throws(() => renderNodes([['path', { fill: 'url(https://example.com)' }]]));
  assert.equal(renderNodes([['path', { d: '<"&' }]]), '<path d="&lt;&quot;&amp;" />');
});

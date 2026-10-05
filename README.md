# Outline Icons for Elementor

Author: [Opeyemi Ogunsanya](https://opeyemiweb.dev)

Repository: [outline-icons-for-elementor](https://github.com/o-opeyemi/lucide-elementor-icons)

A WordPress plugin adding Lucide to Elementor's existing icon picker.
Icons are bundled locally, searchable, and inherit Elementor color/size controls.
The editor uses CSS masks; PHP renders selected icons as inline SVGs. Published
pages do not download the complete icon font or editor stylesheet. No CDN or
extra widgets. Requires WordPress 6.5+, PHP 7.4+, and Elementor.

## Install

Upload the generated `outline-icons-for-elementor.zip` under **Plugins → Add New → Upload Plugin**,
activate it, and open the **Lucide** tab in an Elementor icon selector.
Alternatively, this source folder is itself an installable plugin when its
generated `assets/` and `licenses/` folders are present.

## Build

Requires Node.js 22+ and npm on the development machine only:

```sh
npm ci --ignore-scripts
npm run package
```

This rebuilds assets from `lucide-static`, checks the catalog and SVG safety,
and produces a WordPress ZIP in your system temporary directory under
`outline-icons-for-elementor-dist/`. The build prints its full path. Set
`LEI_OUTPUT_DIR` to choose another directory outside the plugin folder.
Keeping ZIPs outside the installed plugin prevents Plugin Check's
`compressed_files` error. Commit `package.json`,
`package-lock.json`, generated `assets/`, and `licenses/`. Do not commit
`node_modules/` or the build cache. Plugin code uses GPL-2.0-or-later;
Lucide/Feather assets retain the full ISC/MIT notices in `licenses/LUCIDE.txt`.

## GitHub dependency updates

Push **this plugin folder as the repository root**, including `.github/`.
Git itself does not monitor dependencies; GitHub Dependabot does.
`package.json` explicitly pins `lucide-static`; `package-lock.json` records
its version and integrity. `.github/dependabot.yml` checks npm every Monday
at 09:00 Africa/Lagos and opens update PRs. GitHub Actions dependencies are
also monitored weekly. Enable GitHub Actions in the repository and watch it
for pull-request notifications; email delivery depends on your GitHub settings.

Every push and PR builds from the updated lockfile, tests assets, lints PHP,
and uploads an installable ZIP as a workflow artifact. Updates are reviewed,
not automatically merged or installed on WordPress.

Dependabot updates manifests/lockfiles, not the committed generated assets.
To update those too, check out its PR, run the build, and commit the output:

```sh
npm ci --ignore-scripts
npm run package
git add assets licenses
git commit -m "Rebuild bundled Lucide assets"
```

Then test the workflow ZIP in Elementor before merging. Install that ZIP on
WordPress to deploy the update. If you only merge the manifest change, the
workflow ZIP is still rebuilt correctly, but a raw source-folder installation
will keep its previous generated assets until rebuilt. Icon names are saved
in Elementor content; review upstream removals or renames before upgrading.

If this plugin lives in a larger repository, place `.github/` at that repository
root, change Dependabot's npm `directory` to the plugin path, and configure the
workflow working directory and npm cache dependency path accordingly.

## Verification scope

Build tests cover matching catalogs, local SVG previews, upstream version and
license preservation, and rejection of active SVG elements/attributes. PHP
syntax and ZIP checks run in CI. Check editor selection, color/size, and the
published page in your Elementor version before deploying. Widgets that bypass
Elementor's icon renderer and output raw icon classes may need separate support.

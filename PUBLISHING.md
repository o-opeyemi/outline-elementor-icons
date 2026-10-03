# WordPress.org publishing preparation

The plugin code currently uses GPL-2.0-or-later, WordPress.org's recommended
choice. Bundled icons retain upstream ISC and MIT notices in
`licenses/LUCIDE.txt`. Preserve those notices when rebuilding or redistributing.
Commercial use is allowed under those terms; the GPL also gives recipients
redistribution and modification rights. Licensing does not imply trademark rights.

Sources:
- https://lucide.dev/license
- https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/

## Remaining preparation

Choose original branding before submission. The current name starts with
Lucide, another project's name; WordPress.org restricts slugs beginning with
another project's term. A structure such as “YOUR BRAND — Outline Icons for
Elementor” would distinguish ownership. Name availability has not been checked.
After choosing it, align the PHP name, readme title, folder/slug, text domain,
package output, and documentation before submitting. Do not invent contributors.

Add your real WordPress.org username to `Contributors:` in `readme.txt` and
your author name to the PHP header. Add a real repository/support URL if desired.
Run installation and visual checks against the WordPress and Elementor versions
you plan to support; only then set `Tested up to:` to the tested WordPress version.
The current automated checks do not establish full builder compatibility.

The ZIP includes build scripts and manifests for source availability. It excludes
node_modules and npm caches. Keep upstream license files in every release.

## Submission and releases

1. Install the official Plugin Check plugin on a test site and resolve findings.
2. Validate readme.txt with WordPress.org's readme validator.
3. Build the ZIP, log in to WordPress.org, and submit it for review.
4. Respond to reviewer requests. Approval is not guaranteed by local checks.
5. After approval, publish releases through the assigned WordPress.org SVN
   repository. Keep the PHP version and readme stable tag consistent, create
   the corresponding version tag, and increment the version for new releases.

GitHub remains the development repository. Dependabot PRs notify maintainers
about dependencies; they do not publish a WordPress.org release.

Sources:
- https://wordpress.org/plugins/plugin-check/
- https://wordpress.org/plugins/developers/readme-validator/
- https://wordpress.org/plugins/developers/add/
- https://developer.wordpress.org/plugins/wordpress-org/planning-submitting-and-maintaining-plugins/
- https://developer.wordpress.org/plugins/wordpress-org/how-your-readme-txt-works/

The readme short description stays below 150 characters. The longer description
explains actual features and limits, without invented benchmarks or testimonials.

=== Lucide Icons for Elementor ===
Tags: elementor, lucide, icons, svg
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 7.4
Requires Plugins: elementor
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html

Add 1,800+ Lucide outline icons to Elementor. Search, insert, and style scalable SVG icons using the controls you already know.

== Description ==
Bring a consistent outline style to your Elementor designs with a searchable
library of more than 1,800 Lucide icons. Find an icon for a feature, service,
navigation item, or call to action, then insert it directly from Elementor's
existing icon picker. You can keep working in the editor you already use,
without adding another widget collection or uploading icons one at a time.

Lucide's simple line icons suit portfolios, business websites, landing pages,
and product interfaces. Use them to make feature lists easier to scan, support
short pieces of text, or give repeated sections a consistent visual language.
Choose the icons that fit your content and adjust their appearance through
the Elementor controls available in your chosen widget.

= A familiar workflow =

Once the plugin is active, open a supported Elementor icon control and choose
the Lucide tab. Browse the library or search by icon name, select an icon,
and insert it. Your selection is saved with the Elementor content, so you
can return to the page and change it through the same icon control.

= Features =

* More than 1,800 Lucide outline icons in a searchable library.
* Integration with Elementor's native icon picker.
* Scalable SVG output for crisp icons at different display sizes.
* Color and size styling through the controls supported by your widget.
* All icon data included in the plugin, with no CDN requests for rendering.
* No API key, external account, or separate icon-pack upload required.
* No additional icon widgets or plugin settings to configure.

= Icons served from your own website =

The icon library is included with the plugin and served from your WordPress
installation. Your visitors do not need to connect to an external icon service
to see the icons. On pages rendered through Elementor's icon renderer, selected
icons are output as inline SVGs rather than requiring a complete icon font.
The full preview stylesheet is used in the editor and its preview, while the
published page uses a small shared stylesheet for the SVG appearance.

= Requirements and compatibility =

Requires WordPress 6.5 or later, PHP 7.4 or later, and Elementor. The integration
uses Elementor's icon-library hooks and does not require an Elementor Pro API.
Available styling controls depend on the widget. Third-party widgets that
output icon classes directly instead of using Elementor's icon renderer may
need additional integration. This plugin does not provide a dedicated stroke
width control or a Gutenberg block.

= Privacy =

This plugin does not add analytics, collect visitor information, create an
external account, or contact an external icon API. Its icon assets are served
from your website. Dependency downloads are part of the developer build process,
not something performed by the plugin on your WordPress server.

= Credits and licensing =

Plugin code is licensed under GPLv2 or later. Lucide icons retain their ISC
license, and Feather-derived icons retain their MIT notices. The complete
upstream notices are included in licenses/LUCIDE.txt. These licenses permit
commercial use while requiring preservation of the applicable notices.

Lucide: https://lucide.dev/
Elementor: https://elementor.com/

This is an independent integration and is not affiliated with or endorsed
by the Lucide or Elementor projects.

= Build source =

The plugin includes its readable PHP source, npm dependency manifest and
lockfile, and build scripts. Developer build instructions are in README.md.
Node.js and npm are needed only to rebuild the icon library, not to use the
installed WordPress plugin.

== Installation ==
1. Install and activate Elementor.
2. Upload lucide-elementor-icons.zip under Plugins > Add New > Upload Plugin.
3. Activate Lucide Icons for Elementor.
4. Open an Elementor icon selector, choose Lucide, search, and insert an icon.

== Frequently Asked Questions ==

= Do I need to download Lucide separately? =
No. The icon data is already included in the plugin.

= Will the plugin replace my existing icons? =
No. It adds a Lucide library to the picker. Existing icon libraries remain
available, and you choose which icons to insert.

= Can I change icon color and size? =
Yes, through the controls available in the Elementor widget you are using.
SVG icons inherit the surrounding icon color. This plugin does not add its
own styling panel.

= Does the plugin automatically update Lucide on my website? =
No. Bundled icons change when you install a plugin release containing updated
assets. Developer dependency monitoring does not install updates on your site.

= What happens if I deactivate the plugin? =
The Lucide picker library and its rendering integration will be unavailable.
Keep the plugin active on sites that use icons selected from its library.

== Changelog ==
= 1.0.0 =
* Initial local SVG library and dependency update workflow.

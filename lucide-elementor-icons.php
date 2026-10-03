<?php
/**
 * Plugin Name: Lucide Icons for Elementor
 * Plugin URI: https://github.com/o-opeyemi/lucide-elementor-icons
 * Description: Add 1,800+ clean outline icons to Elementor's existing icon picker. Search and insert scalable Lucide SVGs, style them with Elementor's color and size controls, and build consistent designs without a CDN, API key, or separate icon uploads.
 * Version: 1.0.0
 * Author: Opeyemi Ogunsanya
 * Author URI: https://opeyemiweb.dev
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Requires Plugins: elementor
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: lucide-elementor-icons
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class LEI_Lucide_Icons {
	private static $data;

	public static function data() {
		if ( null === self::$data ) {
			$file = __DIR__ . '/assets/icons.json';
			self::$data = is_readable( $file ) ? json_decode( file_get_contents( $file ), true ) : array();
			if ( ! is_array( self::$data ) ) {
				self::$data = array();
			}
		}
		return self::$data;
	}

	public static function version() {
		$data = self::data();
		return '1.0.0-' . ( $data['version'] ?? 'missing' );
	}

	public static function register_library( $tabs ) {
		$data = self::data();
		if ( empty( $data['icons'] ) ) {
			return $tabs;
		}
		$tabs['lei-lucide'] = array(
			'name'            => 'lei-lucide',
			'label'           => 'Lucide',
			'url'             => plugins_url( 'assets/base.css', __FILE__ ),
			'enqueue'         => array(),
			'prefix'          => 'lei-',
			'displayPrefix'   => 'lei',
			'labelIcon'       => 'eicon-favorite',
			'ver'             => self::version(),
			'fetchJson'       => add_query_arg( 'ver', self::version(), plugins_url( 'assets/catalog.json', __FILE__ ) ),
			'native'          => false,
			'render_callback' => array( __CLASS__, 'render' ),
		);
		return $tabs;
	}

	public static function editor_styles() {
		wp_enqueue_style( 'lei-lucide-picker', plugins_url( 'assets/editor.css', __FILE__ ), array(), self::version() );
	}

	public static function render( $icon, $attributes = array(), $tag = 'i' ) {
		if ( ! is_string( $icon['value'] ?? null ) || 'lei-lucide' !== ( $icon['library'] ?? '' ) ) {
			return '';
		}
		$name = '';
		foreach ( preg_split( '/\s+/', trim( $icon['value'] ) ) as $class ) {
			if ( preg_match( '/^lei-([a-z0-9-]+)$/D', $class, $matches ) ) {
				$name = $matches[1];
				break;
			}
		}
		$data = self::data();
		if ( ! isset( $data['icons'][ $name ] ) ) {
			return '';
		}
		$classes = $attributes['class'] ?? array();
		if ( ! is_array( $classes ) ) {
			$classes = array( $classes );
		}
		$classes[] = 'lei-svg lei-' . $name;
		$attributes['class'] = implode( ' ', $classes );
		$attributes = array_merge(
			array(
				'xmlns' => 'http://www.w3.org/2000/svg',
				'width' => '1em', 'height' => '1em', 'viewBox' => '0 0 24 24',
				'fill' => 'none', 'stroke' => 'currentColor', 'stroke-width' => '2',
				'stroke-linecap' => 'round', 'stroke-linejoin' => 'round',
				'aria-hidden' => 'true', 'focusable' => 'false',
			),
			$attributes
		);
		// SVG bodies are generated from whitelisted upstream node data, never from user input.
		return '<svg ' . \Elementor\Utils::render_html_attributes( $attributes ) . '>' . $data['icons'][ $name ] . '</svg>';
	}

	public static function boot() {
		if ( ! did_action( 'elementor/loaded' ) ) {
			return;
		}
		add_filter( 'elementor/icons_manager/additional_tabs', array( __CLASS__, 'register_library' ) );
		add_action( 'elementor/editor/before_enqueue_styles', array( __CLASS__, 'editor_styles' ) );
		add_action( 'elementor/preview/enqueue_styles', array( __CLASS__, 'editor_styles' ) );
	}
}

add_action( 'plugins_loaded', array( 'LEI_Lucide_Icons', 'boot' ), 20 );

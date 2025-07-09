
<?php
/**
 * Funções do tema Portal TVI
 */

// Impedir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuração do tema
 */
function portal_tvi_setup() {
    // Suporte a thumbnails
    add_theme_support('post-thumbnails');
    
    // Suporte a título dinâmico
    add_theme_support('title-tag');
    
    // Suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    
    // Registrar menus
    register_nav_menus(array(
        'primary' => 'Menu Principal',
        'sidebar' => 'Menu Sidebar'
    ));
}
add_action('after_setup_theme', 'portal_tvi_setup');

/**
 * Enqueue scripts e styles
 */
function portal_tvi_scripts() {
    // Tailwind CSS via CDN (primeiro para ter prioridade)
    wp_enqueue_style('tailwind-css', 'https://cdn.tailwindcss.com', array(), '3.4.0');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // CSS principal (depois do Tailwind)
    wp_enqueue_style('portal-tvi-style', get_stylesheet_uri(), array('tailwind-css'), '1.0.1');
    
    // Script para configurar Tailwind
    wp_add_inline_script('jquery', "
        if (typeof tailwind !== 'undefined') {
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        colors: {
                            'navy': {
                                DEFAULT: '#0A1929',
                                light: '#1A2A3A',
                                lighter: '#2A3A4A'
                            }
                        }
                    }
                }
            }
        }
    ");
    
    // JavaScript principal
    wp_enqueue_script('portal-tvi-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'portal_tvi_scripts');

/**
 * Registrar sidebars
 */
function portal_tvi_widgets_init() {
    register_sidebar(array(
        'name'          => 'Sidebar Principal',
        'id'            => 'sidebar-1',
        'description'   => 'Widgets da sidebar principal',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'portal_tvi_widgets_init');

/**
 * Configurar tamanhos de imagem personalizados
 */
function portal_tvi_image_sizes() {
    add_image_size('hero-size', 800, 400, true);
    add_image_size('card-size', 400, 250, true);
}
add_action('after_setup_theme', 'portal_tvi_image_sizes');

/**
 * Adicionar meta box para post em destaque
 */
function portal_tvi_add_meta_boxes() {
    add_meta_box(
        'featured-post',
        'Post em Destaque',
        'portal_tvi_featured_post_callback',
        'post',
        'side'
    );
}
add_action('add_meta_boxes', 'portal_tvi_add_meta_boxes');

function portal_tvi_featured_post_callback($post) {
    wp_nonce_field('portal_tvi_save_featured_post', 'portal_tvi_featured_post_nonce');
    $value = get_post_meta($post->ID, 'featured_post', true);
    ?>
    <label for="featured_post">
        <input type="checkbox" id="featured_post" name="featured_post" value="1" <?php checked($value, '1'); ?>>
        Marcar como post em destaque
    </label>
    <?php
}

function portal_tvi_save_featured_post($post_id) {
    if (!isset($_POST['portal_tvi_featured_post_nonce']) || 
        !wp_verify_nonce($_POST['portal_tvi_featured_post_nonce'], 'portal_tvi_save_featured_post')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    if (isset($_POST['featured_post'])) {
        update_post_meta($post_id, 'featured_post', '1');
    } else {
        delete_post_meta($post_id, 'featured_post');
    }
}
add_action('save_post', 'portal_tvi_save_featured_post');

/**
 * Configurações do Customizer
 */
function portal_tvi_customize_register($wp_customize) {
    // Seção de cores
    $wp_customize->add_section('portal_tvi_colors', array(
        'title' => 'Cores do Portal TVI',
        'priority' => 30,
    ));
    
    // Cor primária
    $wp_customize->add_setting('primary_color', array(
        'default' => '#3b82f6',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', array(
        'label' => 'Cor Primária',
        'section' => 'portal_tvi_colors',
    )));
}
add_action('customize_register', 'portal_tvi_customize_register');
?>

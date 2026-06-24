
<?php
/**
 * The main template file
 * Template principal do Portal TVI
 */

get_header(); ?>

<main class="flex-grow">
    <?php if (have_posts()) : ?>
        <!-- Hero Section -->
        <section class="py-8">
            <div class="container mx-auto px-4">
                <?php
                // Pegar o primeiro post para o hero
                $hero_query = new WP_Query(array(
                    'posts_per_page' => 1,
                    'meta_key' => 'featured_post',
                    'meta_value' => '1'
                ));
                
                if ($hero_query->have_posts()) :
                    while ($hero_query->have_posts()) : $hero_query->the_post();
                ?>
                <div class="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer bg-navy" onclick="window.location.href='<?php the_permalink(); ?>'">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('large', array('class' => 'w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105')); ?>
                    <?php else : ?>
                        <div class="w-full h-[420px] bg-gray-800 transition-transform duration-500 group-hover:scale-105"></div>
                    <?php endif; ?>

                    <!-- Dark gradient to keep text legible -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                    <!-- Title + category/date overlay -->
                    <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                                <?php 
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo esc_html($categories[0]->name);
                                }
                                ?>
                            </span>
                            <span class="text-white/80 text-xs font-medium uppercase tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                                <?php echo get_the_date(); ?>
                            </span>
                        </div>

                        <h1 class="relative inline-block max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            <!-- Sliding background revealed on hover -->
                            <span aria-hidden="true" class="absolute inset-0 -z-0 bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                            <!-- Text whose color flips on hover -->
                            <span class="relative z-10 px-2 py-1 transition-colors duration-500 group-hover:text-blue-900 block sm:inline">
                                <?php the_title(); ?>
                            </span>
                        </h1>
                    </div>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </section>

        <!-- Latest News Grid -->
        <section class="py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-bold text-white">Últimas Notícias</h2>
                    <div class="h-px bg-gradient-to-r from-blue-500 to-transparent flex-grow ml-4"></div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <?php
                    // Query para as últimas notícias (excluindo o post em destaque)
                    $latest_query = new WP_Query(array(
                        'posts_per_page' => 8,
                        'meta_query' => array(
                            array(
                                'key' => 'featured_post',
                                'compare' => 'NOT EXISTS'
                            )
                        )
                    ));
                    
                    if ($latest_query->have_posts()) :
                        while ($latest_query->have_posts()) : $latest_query->the_post();
                    ?>
                    <div class="bg-navy-light border border-gray-700 rounded-lg overflow-hidden h-full flex flex-col cursor-pointer card-hover" onclick="window.location.href='<?php the_permalink(); ?>'">
                        <div class="aspect-video w-full overflow-hidden">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-cover transition-transform duration-500 hover:scale-110')); ?>
                            <?php else : ?>
                                <div class="w-full h-full bg-gray-600 flex items-center justify-center">
                                    <span class="text-gray-400">Sem imagem</span>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs font-medium text-blue-400 uppercase tracking-wider">
                                    <?php echo get_the_category_list(', '); ?>
                                </span>
                                <span class="text-xs text-gray-400"><?php echo get_the_date(); ?></span>
                            </div>
                            <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2"><?php the_title(); ?></h3>
                            <p class="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow"><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                            <span class="text-blue-400 text-sm font-medium hover:underline self-start mt-auto">
                                Ler Mais
                            </span>
                        </div>
                    </div>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </div>
        </section>

    <?php else : ?>
        <div class="container mx-auto px-4 py-8">
            <p class="text-white text-center">Nenhum post encontrado.</p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>

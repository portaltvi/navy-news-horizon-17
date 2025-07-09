
<?php
/**
 * Template para posts individuais
 */

get_header(); ?>

<main class="flex-grow">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article class="py-8">
                <div class="container mx-auto px-4 max-w-4xl">
                    <!-- Breadcrumb -->
                    <nav class="mb-6">
                        <a href="<?php echo home_url(); ?>" class="text-blue-400 hover:underline">← Voltar para Home</a>
                    </nav>

                    <!-- Post Header -->
                    <header class="mb-8">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm font-medium text-blue-400 uppercase tracking-wider">
                                <?php echo get_the_category_list(', '); ?>
                            </span>
                            <div class="text-sm text-gray-400">
                                <span><?php echo get_the_date(); ?></span>
                                <?php if (get_the_modified_date() !== get_the_date()) : ?>
                                    <span class="ml-2">Atualizado: <?php echo get_the_modified_date(); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-6"><?php the_title(); ?></h1>
                        
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="mb-6">
                                <?php the_post_thumbnail('large', array('class' => 'w-full h-auto rounded-lg')); ?>
                            </div>
                        <?php endif; ?>
                    </header>

                    <!-- Post Content -->
                    <div class="prose prose-lg prose-invert max-w-none">
                        <?php the_content(); ?>
                    </div>

                    <!-- Share Buttons -->
                    <div class="mt-8 pt-8 border-t border-gray-700">
                        <h3 class="text-lg font-semibold text-white mb-4">Compartilhar</h3>
                        <div class="flex space-x-4">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" 
                               target="_blank" 
                               class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" 
                               target="_blank" 
                               class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                                Twitter
                            </a>
                            <a href="https://api.whatsapp.com/send?text=<?php echo urlencode(get_the_title() . ' - ' . get_permalink()); ?>" 
                               target="_blank" 
                               class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        <?php endwhile; ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>


<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('min-h-screen flex flex-col bg-navy text-foreground antialiased'); ?>>
<?php wp_body_open(); ?>

<header>
    <!-- Site Links Bar -->
    <div class="bg-gray-200 py-1">
        <div class="container mx-auto px-4">
            <div class="flex justify-center space-x-8">
                <a href="#" class="text-xs sm:text-sm font-medium lowercase hover:opacity-80 transition-opacity" style="color: #007bff;">info</a>
                <a href="#" class="text-xs sm:text-sm font-medium lowercase hover:opacity-80 transition-opacity" style="color: #2b7e1f;">sports</a>
                <a href="#" class="text-xs sm:text-sm font-medium lowercase hover:opacity-80 transition-opacity" style="color: #f9a830;">fun</a>
                <a href="#" class="text-xs sm:text-sm font-medium lowercase hover:opacity-80 transition-opacity" style="color: #e977e6;">geek</a>
                <a href="#" class="text-xs sm:text-sm font-medium lowercase hover:opacity-80 transition-opacity" style="color: #151515;">tv papagaio</a>
            </div>
        </div>
    </div>

    <!-- Main Header -->
    <div class="bg-gray-100 z-40 transition-all duration-300">
        <div class="container mx-auto px-4 sm:px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <button class="text-gray-700 p-2 hover:bg-gray-200 rounded" onclick="toggleSidebar()">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div class="absolute left-1/2 transform -translate-x-1/2">
                    <a href="<?php echo home_url(); ?>" class="text-2xl font-bold text-gray-800">
                        Portal <span class="text-blue-600">TVI</span>
                    </a>
                </div>

                <div class="relative">
                    <form role="search" method="get" action="<?php echo home_url('/'); ?>" class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input type="search" 
                               name="s" 
                               placeholder="Pesquisar..." 
                               value="<?php echo get_search_query(); ?>"
                               class="pl-10 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder:text-gray-400 py-2 px-3" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Sidebar (inicialmente oculta) -->
<div id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-gray-50 transform -translate-x-full transition-transform duration-300 z-50">
    <div class="p-4">
        <button onclick="toggleSidebar()" class="mb-4 text-gray-700 hover:bg-gray-200 p-2 rounded">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        
        <div class="space-y-2">
            <div class="text-gray-700 font-medium lowercase">tvi info</div>
            <ul class="ml-4 space-y-1">
                <li><a href="#" class="text-gray-600 lowercase text-base hover:text-blue-600">rio de janeiro</a></li>
                <li><a href="#" class="text-gray-600 lowercase text-base hover:text-blue-600">pernambuco</a></li>
                <li><a href="#" class="text-gray-600 lowercase text-base hover:text-blue-600">país</a></li>
                <li><a href="#" class="text-gray-600 lowercase text-base hover:text-blue-600">mundo</a></li>
                <li><a href="#" class="text-gray-600 lowercase text-base hover:text-blue-600">tv papagaio</a></li>
            </ul>
        </div>
    </div>
</div>

<script>
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}
</script>

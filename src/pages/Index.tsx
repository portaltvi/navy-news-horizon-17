
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import Footer from '@/components/Footer';
import { useWordPressPosts, useMockPosts } from '@/hooks/useWordPressPosts';

const Index = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useWordPressPosts();
  const mockData = useMockPosts();

  const handleHeroClick = () => {
    const postsToUse = error ? mockData.data : posts;
    if (postsToUse && postsToUse.length > 0) {
      navigate(`/post/${postsToUse[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            {/* Hero Section Skeleton */}
            <section className="mb-12">
              <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] bg-navy-light">
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl">
                    <div className="w-20 h-6 bg-primary/20 rounded-full mb-3"></div>
                    <div className="w-full max-w-2xl h-8 bg-white/20 rounded mb-3"></div>
                    <div className="w-full max-w-xl h-6 bg-white/20 rounded mb-2"></div>
                    <div className="w-3/4 h-6 bg-white/20 rounded mb-4"></div>
                    <div className="w-24 h-10 bg-primary/20 rounded"></div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* News Grid Skeleton */}
            <section className="py-10">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="w-48 h-8 bg-white/20 rounded"></div>
                </div>
                <div className="mt-4 h-px bg-navy-lighter"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <NewsCardSkeleton key={index} />
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.log('Erro ao carregar posts, mas usando dados de placeholder');
  }

  // Use mock data if API failed, otherwise use real posts
  const postsToDisplay = error ? mockData.data : posts;
  const heroNews = postsToDisplay?.[0];
  const remainingPosts = postsToDisplay?.slice(1) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          {heroNews && (
            <section className="mb-12">
              <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] cursor-pointer transition-transform duration-300 hover:scale-[1.02]" onClick={handleHeroClick}>
                <img src={heroNews.imageUrl} alt={heroNews.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl">
                    <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded-full mb-3">
                      {heroNews.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                      {heroNews.title}
                    </h1>
                    <p className="text-gray-200 mb-4 line-clamp-3">
                      {heroNews.excerpt}
                    </p>
                    <span className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors">Ler mais</span>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* News Grid */}
          {remainingPosts.length > 0 && (
            <NewsGrid title="Últimas Notícias" news={remainingPosts} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

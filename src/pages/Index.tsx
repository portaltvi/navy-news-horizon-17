
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
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            {/* News Grid Skeleton */}
            <section className="py-10">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="w-48 h-8 bg-white/20 rounded"></div>
                </div>
                <div className="mt-4 h-px bg-navy-lighter"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
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
      <Navbar heroNews={heroNews} onHeroClick={handleHeroClick} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4">          
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

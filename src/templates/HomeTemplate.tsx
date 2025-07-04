
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/content/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import { useWordPressPosts, useMockPosts } from '@/hooks/useWordPressPosts';

const HomeTemplate = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useWordPressPosts();
  const mockData = useMockPosts();

  const handleHeroClick = () => {
    const postsToUse = error ? mockData.data : posts;
    if (postsToUse && postsToUse.length > 0) {
      navigate(`/post/${postsToUse[0].id}`);
    }
  };

  if (error) {
    console.log('Erro ao carregar posts, mas usando dados de placeholder');
  }

  const postsToDisplay = error ? mockData.data : posts;
  const heroNews = postsToDisplay?.[0];
  const remainingPosts = postsToDisplay?.slice(1) || [];

  return (
    <Layout>
      <HeroSection 
        heroNews={heroNews}
        onHeroClick={handleHeroClick}
        isLoading={isLoading}
      />
      
      <div className="container mx-auto px-4">          
        {isLoading ? (
          <section className="py-4">
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
        ) : remainingPosts.length > 0 && (
          <div className="py-4">
            <NewsGrid title="Últimas Notícias" news={remainingPosts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomeTemplate;

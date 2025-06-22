
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import Footer from '@/components/Footer';
import { useWordPressPosts } from '@/hooks/useWordPressPosts';

const Index = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useWordPressPosts();

  const handleHeroClick = () => {
    if (posts && posts.length > 0) {
      navigate(`/post/${posts[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-white">Carregando notícias...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Erro ao carregar notícias</h1>
            <p className="text-gray-300">Tente novamente mais tarde.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroNews = posts?.[0];
  const remainingPosts = posts?.slice(1) || [];

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

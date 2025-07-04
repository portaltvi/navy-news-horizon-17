
import React from 'react';

interface HeroNews {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface HeroSectionProps {
  heroNews?: HeroNews;
  onHeroClick?: () => void;
  isLoading?: boolean;
}

const HeroSection = ({ heroNews, onHeroClick, isLoading }: HeroSectionProps) => {
  if (isLoading) {
    return (
      <div className="bg-navy">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-700 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-700 h-4 rounded mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!heroNews) return null;

  return (
    <div className="bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div 
          onClick={onHeroClick} 
          className={`${onHeroClick ? 'cursor-pointer' : ''} bg-navy-light rounded-lg overflow-hidden shadow-lg`}
        >
          <img 
            src={heroNews.imageUrl} 
            alt={heroNews.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {heroNews.category}
              </span>
              <span className="text-gray-400 text-sm">{heroNews.date}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{heroNews.title}</h1>
            <p className="text-gray-300">{heroNews.excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

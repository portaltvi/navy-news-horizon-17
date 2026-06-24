
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
            <div className="bg-gray-700 h-[420px] rounded-lg"></div>
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
          className={`group relative ${onHeroClick ? 'cursor-pointer' : ''} rounded-lg overflow-hidden shadow-lg`}
        >
          <img
            src={heroNews.imageUrl}
            alt={heroNews.title}
            className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark gradient to keep text legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Title + category overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide mb-4">
              {heroNews.category}
            </span>

            <h1 className="relative inline-block max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {/* Sliding background revealed on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-0 bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              {/* Text whose color flips on hover to contrast with the white background */}
              <span className="relative z-10 px-2 py-1 transition-colors duration-500 group-hover:text-navy">
                {heroNews.title}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import React from 'react';
import { ArrowLeft } from 'lucide-react';
import HeroNewsCard from '../HeroNewsCard';
import HeroNewsCardSkeleton from '../HeroNewsCardSkeleton';
import PostHeader from '../PostHeader';
import SearchResultsContent from '../SearchResultsContent';

interface HeroNews {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface PostData {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  modifiedDate: string;
  modifiedTime: string;
  onShare: (platform: string) => void;
}

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface SearchResults {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onPostClick: (id: number) => void;
}

interface NavbarContentProps {
  heroNews?: HeroNews;
  onHeroClick?: () => void;
  isLoading?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  postData?: PostData;
  errorMessage?: string;
  searchResults?: SearchResults;
}

const NavbarContent = ({ 
  heroNews, 
  onHeroClick, 
  isLoading = false, 
  showBackButton = false, 
  onBackClick, 
  postData,
  errorMessage,
  searchResults
}: NavbarContentProps) => {
  // Show search results if provided
  if (searchResults) {
    return (
      <SearchResultsContent 
        query={searchResults.query}
        results={searchResults.results}
        isLoading={searchResults.isLoading}
        onPostClick={searchResults.onPostClick}
      />
    );
  }

  // Show post content if provided
  if (postData) {
    return (
      <div className="bg-navy text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {showBackButton && (
            <button 
              onClick={onBackClick}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          )}
          
          {errorMessage ? (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-red-400 mb-2">Erro</h2>
                <p className="text-red-200">{errorMessage}</p>
              </div>
            </div>
          ) : (
            <PostHeader postData={postData} />
          )}
        </div>
      </div>
    );
  }

  // Show hero news or loading state
  return (
    <div className="bg-navy">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <HeroNewsCardSkeleton />
        ) : (
          heroNews && (
            <div onClick={onHeroClick} className={onHeroClick ? 'cursor-pointer' : ''}>
              <HeroNewsCard {...heroNews} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NavbarContent;

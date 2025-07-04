
import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
            <div className="bg-navy text-white">
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">{postData.title}</h1>
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      {postData.category}
                    </span>
                    <span>Por {postData.author}</span>
                    <span>{postData.date}</span>
                  </div>
                </div>
                
                {postData.imageUrl && (
                  <div className="mb-8">
                    <img 
                      src={postData.imageUrl} 
                      alt={postData.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: postData.content }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show hero news or loading state - simplified without the missing components
  return (
    <div className="bg-navy">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="bg-gray-700 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-700 h-4 rounded mb-2"></div>
            <div className="bg-gray-700 h-4 rounded w-3/4"></div>
          </div>
        ) : (
          heroNews && (
            <div onClick={onHeroClick} className={`${onHeroClick ? 'cursor-pointer' : ''} bg-navy-light rounded-lg overflow-hidden shadow-lg`}>
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
          )
        )}
      </div>
    </div>
  );
};

export default NavbarContent;

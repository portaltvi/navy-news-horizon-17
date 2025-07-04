
import React from 'react';
import { Search } from 'lucide-react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface SearchResultsContentProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onPostClick: (id: number) => void;
}

const SearchResultsContent = ({ query, results, isLoading, onPostClick }: SearchResultsContentProps) => {
  return (
    <div className="bg-navy min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Search Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">
              Resultados da Pesquisa
            </h1>
          </div>
          
          {query && (
            <div className="bg-navy-light p-4 rounded-lg shadow-sm border border-blue-500/20">
              <p className="text-gray-300">
                Você pesquisou por: <span className="font-semibold text-blue-400">"{query}"</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
          
          {!query && (
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <p className="text-blue-200">
                Digite um termo de pesquisa para encontrar notícias.
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Search Results */}
        {!isLoading && query && results.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-blue-500/20">
              Resultados Encontrados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map(post => (
                <div key={post.id} onClick={() => onPostClick(post.id)} className="cursor-pointer">
                  <NewsCard 
                    id={post.id} 
                    title={post.title} 
                    excerpt={post.excerpt} 
                    imageUrl={post.imageUrl} 
                    category={post.category} 
                    date={post.date} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && results.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-blue-400/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-gray-300 mb-6">
              Não encontramos nenhuma notícia com o termo "{query}".
            </p>
            <div className="bg-navy-light p-4 rounded-lg max-w-md mx-auto border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2">Dicas de pesquisa:</h3>
              <ul className="text-sm text-gray-300 text-left space-y-1">
                <li>• Verifique a ortografia das palavras</li>
                <li>• Tente usar termos mais gerais</li>
                <li>• Use palavras-chave diferentes</li>
                <li>• Pesquise por categoria (Info, Sports, Fun, Geek)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsContent;

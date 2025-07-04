
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useWordPressPosts, useMockPosts } from '@/hooks/useWordPressPosts';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import NewsCardSkeleton from '@/components/NewsCardSkeleton';
import Footer from '@/components/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: wordpressPosts, isLoading, error } = useWordPressPosts();
  const { data: mockPosts } = useMockPosts();
  
  const posts = error ? mockPosts : wordpressPosts || [];
  
  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.category.toLowerCase().includes(query.toLowerCase())
  );

  const handlePostClick = (id: number) => {
    window.location.href = `/post/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Resultados da Pesquisa
            </h1>
          </div>
          
          {query && (
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-gray-600">
                Você pesquisou por: <span className="font-semibold text-gray-800">"{query}"</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
          
          {!query && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800">
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
        {!isLoading && query && filteredPosts.length > 0 && (
          <NewsGrid 
            title="Resultados Encontrados"
            news={filteredPosts.map(post => ({
              ...post,
              onClick: () => handlePostClick(post.id)
            }))}
          />
        )}

        {/* No Results */}
        {!isLoading && query && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-gray-500 mb-6">
              Não encontramos nenhuma notícia com o termo "{query}".
            </p>
            <div className="bg-gray-100 p-4 rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold text-gray-700 mb-2">Dicas de pesquisa:</h3>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• Verifique a ortografia das palavras</li>
                <li>• Tente usar termos mais gerais</li>
                <li>• Use palavras-chave diferentes</li>
                <li>• Pesquise por categoria (Info, Sports, Fun, Geek)</li>
              </ul>
            </div>
          </div>
        )}

        {/* All Posts when no search query */}
        {!isLoading && !query && posts.length > 0 && (
          <NewsGrid 
            title="Todas as Notícias"
            news={posts.map(post => ({
              ...post,
              onClick: () => handlePostClick(post.id)
            }))}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;


import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SearchResultsContent from '@/components/SearchResultsContent';
import { useWordPressPosts, useMockPosts } from '@/hooks/useWordPressPosts';

const SearchTemplate = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: wordpressPosts, isLoading, error } = useWordPressPosts();
  const { data: mockPosts } = useMockPosts();
  
  const posts = error ? mockPosts : wordpressPosts || [];
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.category.toLowerCase().includes(query.toLowerCase())
  );

  const handlePostClick = (id: number) => {
    window.location.href = `/post/${id}`;
  };

  return (
    <Layout>
      <SearchResultsContent 
        query={query}
        results={filteredPosts}
        isLoading={isLoading}
        onPostClick={handlePostClick}
      />
    </Layout>
  );
};

export default SearchTemplate;


import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWordPressPosts, useMockPosts } from '@/hooks/useWordPressPosts';
import Navbar from '@/components/Navbar';
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

  const searchResults = {
    query,
    results: filteredPosts,
    isLoading,
    onPostClick: handlePostClick
  };

  return (
    <div className="min-h-screen bg-navy">
      <Navbar searchResults={searchResults} />
      <Footer />
    </div>
  );
};

export default SearchResults;

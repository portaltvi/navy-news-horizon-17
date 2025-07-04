
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import PostContent from '@/components/content/PostContent';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  date: string;
  modified: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
    }>>;
    author?: Array<{
      name: string;
    }>;
  };
}

const fetchWordPressPost = async (id: string): Promise<WordPressPost> => {
  const response = await fetch(`https://portaltvi.com/wp-json/wp/v2/posts/${id}?_embed`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

const PostTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['wordpress-post', id],
    queryFn: () => fetchWordPressPost(id!),
    enabled: !!id,
  });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title.rendered || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="bg-navy text-white min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="bg-gray-700 h-8 rounded mb-4"></div>
              <div className="bg-gray-700 h-64 rounded mb-4"></div>
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-4 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="bg-navy text-white min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-red-400 mb-2">Erro</h2>
                <p className="text-red-200">Post não encontrado</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069';
  
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Notícias';
  const author = post._embedded?.author?.[0]?.name || 'Portal TVI';
  
  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const modifiedDate = new Date(post.modified).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const modifiedTime = new Date(post.modified).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const cleanContent = post.content.rendered
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/&nbsp;/g, ' ');

  return (
    <Layout>
      <PostContent
        title={post.title.rendered}
        content={cleanContent}
        imageUrl={imageUrl}
        category={category}
        author={author}
        date={date}
        modifiedDate={modifiedDate}
        modifiedTime={modifiedTime}
        showBackButton={true}
        onBackClick={() => navigate('/')}
        onShare={handleShare}
      />
    </Layout>
  );
};

export default PostTemplate;

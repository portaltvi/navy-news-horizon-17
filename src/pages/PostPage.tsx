
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Facebook, Twitter, Link2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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

const PostPage = () => {
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
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isLoading={true}
          showBackButton={true}
          onBackClick={() => navigate('/')}
        />
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isLoading={false}
          showBackButton={true}
          onBackClick={() => navigate('/')}
          errorMessage="Post não encontrado"
        />
        <Footer />
      </div>
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

  const postData = {
    title: post.title.rendered,
    content: cleanContent,
    imageUrl,
    category,
    author,
    date,
    modifiedDate,
    modifiedTime,
    onShare: handleShare
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        showBackButton={true}
        onBackClick={() => navigate('/')}
        postData={postData}
      />
      <Footer />
    </div>
  );
};

export default PostPage;

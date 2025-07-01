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
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-white text-lg">Carregando post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Post não encontrado</h1>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </main>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>
        
        <article className="max-w-4xl mx-auto">
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
            <img 
              src={imageUrl} 
              alt={post.title.rendered}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Botões de compartilhamento */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-400 mr-2">Compartilhar:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="text-gray-600 hover:text-blue-600"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="text-gray-600 hover:text-blue-400"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('copy')}
              className="text-gray-600 hover:text-gray-800"
            >
              <Link2 className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Informações do autor e categoria */}
          <div className="text-xs text-gray-400 mb-4">
            <span className="uppercase font-medium text-primary">{category}</span> | De: {author}
            <br />
            Atualizado em: {modifiedDate}, {modifiedTime}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {post.title.rendered}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostPage;

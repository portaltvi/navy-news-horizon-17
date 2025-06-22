
import { useQuery } from '@tanstack/react-query';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
    }>>;
  };
}

interface TransformedPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}

const fetchWordPressPosts = async (): Promise<WordPressPost[]> => {
  const response = await fetch('https://portaltvi.com/wp-json/wp/v2/posts?_embed&per_page=20');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const transformPost = (post: WordPressPost): TransformedPost => {
  const cleanExcerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&hellip;/g, '...')
    .trim();
  
  const cleanContent = post.content.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .trim();

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069';
  
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Notícias';
  
  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    id: post.id,
    title: post.title.rendered,
    excerpt: cleanExcerpt,
    content: cleanContent,
    imageUrl,
    category,
    date
  };
};

export const useWordPressPosts = () => {
  return useQuery({
    queryKey: ['wordpress-posts'],
    queryFn: fetchWordPressPosts,
    select: (data: WordPressPost[]) => data.map(transformPost),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

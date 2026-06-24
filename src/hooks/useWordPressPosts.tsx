
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

// Mock data como fallback - limitado a 8 posts
const mockPosts: TransformedPost[] = [
  {
    id: 1,
    title: "Últimas Notícias do Portal TVI",
    excerpt: "Acompanhe as principais notícias e acontecimentos que estão movimentando o cenário atual.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069",
    category: "Info",
    date: "22 de junho de 2025"
  },
  {
    id: 2,
    title: "Tecnologia em Destaque",
    excerpt: "As principais inovações tecnológicas que estão transformando o mundo dos negócios.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
    category: "Geek",
    date: "21 de junho de 2025"
  },
  {
    id: 3,
    title: "Economia e Mercado",
    excerpt: "Análise completa dos principais indicadores econômicos e tendências do mercado.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070",
    category: "Info",
    date: "20 de junho de 2025"
  },
  {
    id: 4,
    title: "Esportes em Foco",
    excerpt: "Cobertura completa dos principais eventos esportivos e resultados mais recentes.",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070",
    category: "Sports",
    date: "19 de junho de 2025"
  },
  {
    id: 5,
    title: "Entretenimento e Cinema",
    excerpt: "As últimas novidades do mundo do entretenimento e lançamentos cinematográficos.",
    content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    imageUrl: "https://images.unsplash.com/photo-1489599804783-d6b8d9e3ce41?q=80&w=2070",
    category: "Fun",
    date: "18 de junho de 2025"
  },
  {
    id: 6,
    title: "Inovações Tecnológicas",
    excerpt: "Descubra as mais recentes inovações que estão mudando o futuro da tecnologia.",
    content: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    category: "Geek",
    date: "17 de junho de 2025"
  },
  {
    id: 7,
    title: "Campeonatos Esportivos",
    excerpt: "Resumo dos principais campeonatos e competições esportivas da semana.",
    content: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070",
    category: "Sports",
    date: "16 de junho de 2025"
  },
  {
    id: 8,
    title: "Eventos e Festivais",
    excerpt: "Os melhores eventos culturais e festivais que acontecem neste mês.",
    content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070",
    category: "Fun",
    date: "15 de junho de 2025"
  },
  {
    id: 9,
    title: "Cultura e Sociedade",
    excerpt: "Reflexões e análises sobre os temas que marcam o nosso tempo.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=2070",
    category: "Info",
    date: "14 de junho de 2025"
  }
];

const fetchWordPressPosts = async (): Promise<WordPressPost[]> => {
  try {
    const response = await fetch('https://portaltvi.com/wp-json/wp/v2/posts?_embed&per_page=8');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.log('WordPress API não disponível, usando dados mock');
    throw error;
  }
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
    retry: 1,
  });
};

// Hook to get mock posts when API fails
export const useMockPosts = () => {
  return { data: mockPosts, isLoading: false, error: null };
};

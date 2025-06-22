
import React, { useState } from 'react';
import NewsCard from './NewsCard';
import NewsModal from './NewsModal';
import SectionHeader from './SectionHeader';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  content?: string;
}

interface NewsGridProps {
  title: string;
  news: NewsItem[];
}

const NewsGrid = ({ title, news }: NewsGridProps) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  // Conteúdo completo dos posts (simulado)
  const getFullContent = (newsItem: NewsItem) => {
    return newsItem.content || `${newsItem.excerpt}\n\nEste é o conteúdo completo da notícia "${newsItem.title}". Aqui você encontraria todos os detalhes, análises aprofundadas e informações adicionais sobre este importante acontecimento.\n\nO desenvolvimento desta história continua a evoluir, e nossa equipe de jornalistas está acompanhando todos os desdobramentos para manter você informado com as últimas atualizações.\n\nPara mais informações sobre este e outros tópicos relacionados, continue acompanhando nossa cobertura completa.`;
  };

  return (
    <section className="py-10">
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            excerpt={item.excerpt}
            imageUrl={item.imageUrl}
            category={item.category}
            date={item.date}
            onClick={() => handleNewsClick(item)}
          />
        ))}
      </div>
      
      {selectedNews && (
        <NewsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedNews.title}
          content={getFullContent(selectedNews)}
          imageUrl={selectedNews.imageUrl}
          category={selectedNews.category}
          date={selectedNews.date}
        />
      )}
    </section>
  );
};

export default NewsGrid;

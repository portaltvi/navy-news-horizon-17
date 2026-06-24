
import React from 'react';
import NewsCard from './NewsCard';
import SectionHeader from './SectionHeader';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  content?: string;
  onClick?: () => void;
}

interface NewsGridProps {
  title: string;
  news: NewsItem[];
  columnsClassName?: string;
}

const NewsGrid = ({
  title,
  news,
  columnsClassName = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}: NewsGridProps) => {
  return (
    <section className="py-0">
      <SectionHeader title={title} />
      <div className={`grid ${columnsClassName} gap-6`}>
        {news.map(item => (
          <div key={item.id} onClick={item.onClick} className={item.onClick ? 'cursor-pointer' : ''}>
            <NewsCard 
              id={item.id} 
              title={item.title} 
              excerpt={item.excerpt} 
              imageUrl={item.imageUrl} 
              category={item.category} 
              date={item.date} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;

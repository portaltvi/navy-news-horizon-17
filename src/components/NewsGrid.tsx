
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
}

const NewsGrid = ({
  title,
  news
}: NewsGridProps) => {
  return (
    <section className="py-0">
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

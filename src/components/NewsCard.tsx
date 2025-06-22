
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface NewsCardProps {
  id: number | string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

const NewsCard = ({ id, title, excerpt, imageUrl, category, date }: NewsCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Card 
      className="overflow-hidden bg-navy-light border-navy-lighter card-hover h-full flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{category}</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">{excerpt}</p>
        <span className="text-primary text-sm font-medium hover:underline self-start mt-auto">
          Ler Mais
        </span>
      </CardContent>
    </Card>
  );
};

export default NewsCard;

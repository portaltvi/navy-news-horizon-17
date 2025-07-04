
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PostContentProps {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  modifiedDate: string;
  modifiedTime: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onShare: (platform: string) => void;
}

const PostContent = ({ 
  title, 
  content, 
  imageUrl, 
  category, 
  author, 
  date, 
  showBackButton = false,
  onBackClick,
  onShare 
}: PostContentProps) => {
  return (
    <div className="bg-navy text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {showBackButton && (
          <button 
            onClick={onBackClick}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {category}
            </span>
            <span>Por {author}</span>
            <span>{date}</span>
          </div>
        </div>
        
        {imageUrl && (
          <div className="mb-8">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default PostContent;

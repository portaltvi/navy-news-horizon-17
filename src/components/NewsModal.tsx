
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}

const NewsModal = ({ isOpen, onClose, title, content, imageUrl, category, date }: NewsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-navy-light border-navy-lighter">
        <DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{category}</span>
            <span className="text-sm text-gray-400">{date}</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-left leading-tight">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;

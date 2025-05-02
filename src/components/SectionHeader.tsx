
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <a href="#" className="text-primary text-sm hover:underline hidden sm:block">
          View All
        </a>
      </div>
      <Separator className="mt-4 bg-navy-lighter" />
    </div>
  );
};

export default SectionHeader;

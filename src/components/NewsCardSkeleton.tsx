
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const NewsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden bg-navy-light border-navy-lighter h-full flex flex-col">
      <div className="aspect-video w-full">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-4" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-4 w-16 mt-4" />
      </CardContent>
    </Card>
  );
};

export default NewsCardSkeleton;

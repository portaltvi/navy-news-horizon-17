import React from 'react';
import { ArrowLeft, Facebook, Twitter, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
interface PostData {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  modifiedDate: string;
  modifiedTime: string;
  onShare: (platform: string) => void;
}
interface HeroNews {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}
interface NavbarContentProps {
  heroNews?: HeroNews;
  onHeroClick?: () => void;
  isLoading?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  postData?: PostData;
  errorMessage?: string;
}
const NavbarContent = ({
  heroNews,
  onHeroClick,
  isLoading,
  showBackButton = false,
  onBackClick,
  postData,
  errorMessage
}: NavbarContentProps) => {
  return <div className="bg-navy">
      <div className="container mx-auto px-4 py-6">
        {/* Botão de voltar para posts */}
        {showBackButton && onBackClick && <button onClick={onBackClick} className="flex items-center text-white hover:text-white/80 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>}

        {/* Error state para posts */}
        {errorMessage && <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">{errorMessage}</h1>
          </div>}

        {/* Conteúdo do post */}
        {postData && <article className="max-w-4xl mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
              <img src={postData.imageUrl} alt={postData.title} className="w-full h-full object-cover" />
            </div>

            {/* Botões de compartilhamento */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm mr-2 text-slate-200">Compartilhar:</span>
              <Button variant="outline" size="sm" onClick={() => postData.onShare('facebook')} className="border-white bg-navy-DEFAULT text-slate-200 font-normal">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => postData.onShare('twitter')} className="border-white bg-navy-DEFAULT text-slate-200 font-normal">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => postData.onShare('copy')} className="border-white bg-navy-DEFAULT text-slate-200 font-normal">
                <Link2 className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Informações do autor e categoria */}
            <div className="text-xs text-gray-200 mb-4">
              <span className="uppercase font-medium text-blue-500">{postData.category}</span> | De: {postData.author}
              <br />
              Atualizado em: {postData.modifiedDate}, {postData.modifiedTime}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {postData.title}
            </h1>
            
            <div className="prose prose-gray max-w-none">
              <div className="text-gray-100 leading-relaxed text-lg" dangerouslySetInnerHTML={{
            __html: postData.content
          }} />
            </div>
          </article>}

        {/* Hero news para página inicial */}
        {isLoading && heroNews === undefined ? <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] bg-navy-light border-navy-lighter">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl">
                <Skeleton className="h-6 w-20 mb-3 rounded-full" />
                <Skeleton className="h-8 md:h-10 w-full md:w-3/4 mb-3" />
                <Skeleton className="h-8 md:h-10 w-full md:w-1/2 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div> : heroNews ? <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] cursor-pointer" onClick={onHeroClick}>
            <img src={heroNews.imageUrl} alt={heroNews.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent">
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl">
                <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded-full mb-3">
                  {heroNews.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {heroNews.title}
                </h1>
                <p className="text-gray-200 line-clamp-3">
                  {heroNews.excerpt}
                </p>
              </div>
            </div>
          </div> : null}
      </div>
    </div>;
};
export default NavbarContent;

import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import SiteLinksBar from '@/components/navigation/SiteLinksBar';
import MainHeader from '@/components/navigation/MainHeader';
import AppSidebar from '@/components/navigation/AppSidebar';
import NavbarContent from '@/components/navigation/NavbarContent';

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

interface NavbarProps {
  heroNews?: {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
    date: string;
  };
  onHeroClick?: () => void;
  isLoading?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  postData?: PostData;
  errorMessage?: string;
}

const Navbar = ({ 
  heroNews, 
  onHeroClick, 
  isLoading, 
  showBackButton = false, 
  onBackClick, 
  postData,
  errorMessage 
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 my-0 mx-0 py-0">
          <SiteLinksBar />
          <MainHeader isScrolled={isScrolled} />
          <NavbarContent 
            heroNews={heroNews}
            onHeroClick={onHeroClick}
            isLoading={isLoading}
            showBackButton={showBackButton}
            onBackClick={onBackClick}
            postData={postData}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Navbar;

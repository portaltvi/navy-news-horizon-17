
import React, { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

const siteLinks = [{
  name: 'info',
  color: '#007bff',
  href: '#'
}, {
  name: 'sports',
  color: '#2b7e1f',
  href: '#'
}, {
  name: 'fun',
  color: '#f9a830',
  href: '#'
}, {
  name: 'geek',
  color: '#e977e6',
  href: '#'
}, {
  name: 'tv papagaio',
  color: '#151515',
  href: '#'
}];

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <Sidebar side="left" className="bg-gray-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-start text-base">
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} style={{
                      color: '#4a5568'
                    }} />
                      <span className="text-gray-700 lowercase font-medium">tvi info</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#" className="text-gray-600 lowercase text-base">rio de janeiro</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#" className="text-gray-600 lowercase text-base">pernambuco</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#" className="text-gray-600 lowercase text-base">país</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#" className="text-gray-600 lowercase text-base">mundo</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#" className="text-gray-600 lowercase text-base">tv papagaio</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};

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
}

const Navbar = ({ heroNews, onHeroClick }: NavbarProps) => {
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
          {/* Barra superior com links dos sites */}
          <div className="bg-gray-200 py-1">
            <div className="container mx-auto px-4">
              <div className="flex justify-center space-x-8">
                {siteLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium lowercase hover:opacity-80 transition-opacity"
                    style={{ color: link.color }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Cabeçalho principal */}
          <header className={`bg-gray-100 z-40 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Menu à esquerda */}
                <SidebarTrigger className="text-gray-700 p-2 hover:bg-gray-200 rounded">
                  <Menu className="h-6 w-6" />
                </SidebarTrigger>

                {/* Logo centralizada */}
                <div className="flex-1 flex justify-center">
                  <a href="/" className="text-2xl font-bold text-gray-800">
                    Portal <span className="text-primary">TVI</span>
                  </a>
                </div>

                {/* Barra de pesquisa à direita */}
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input type="search" placeholder="Pesquisar..." className="pl-10 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Post principal com fundo azul */}
          {heroNews && (
            <div className="bg-navy">
              <div className="container mx-auto px-4 py-6">
                <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] cursor-pointer" onClick={onHeroClick}>
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Navbar;

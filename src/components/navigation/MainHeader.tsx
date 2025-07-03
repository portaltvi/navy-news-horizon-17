
import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface MainHeaderProps {
  isScrolled: boolean;
}

const MainHeader = ({ isScrolled }: MainHeaderProps) => {
  return (
    <header className={`bg-gray-100 z-40 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Menu à esquerda */}
          <div className="flex items-center">
            <SidebarTrigger className="text-gray-700 p-2 hover:bg-gray-200 rounded">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
          </div>

          {/* Logo centralizada */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Portal <span className="text-primary">TVI</span>
            </a>
          </div>

          {/* Barra de pesquisa à direita */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Pesquisar..." 
                className="pl-10 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-black placeholder:text-gray-400" 
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;

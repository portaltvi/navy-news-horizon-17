
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showSidebar ? (
        <SidebarProvider defaultOpen={false}>
          <div className="min-h-screen flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      ) : (
        <>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;

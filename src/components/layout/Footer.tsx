
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import NewsletterSignup from '../NewsletterSignup';

const Footer = () => {
  return (
    <footer className="bg-navy-light mt-10">
      <div className="container mx-auto px-4 py-6">
        {/* Top bar with centered links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
            Política de Privacidade
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">
            Termos de Serviço
          </a>
        </div>
        
        <Separator className="my-4 bg-navy-lighter" />
        
        {/* Bottom bar with copyright and socials */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} - Rede TVI</p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

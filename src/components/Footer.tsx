import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import NewsletterSignup from './NewsletterSignup';
const Footer = () => {
  return <footer className="bg-navy-light mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">NAVY<span className="text-primary">NEWS</span></h4>
            <p className="text-gray-300 text-sm">
              Your trusted source for the latest news, sports, and entertainment coverage. Delivering accurate and timely information since 2023.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-primary transition-colors">About</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">General News</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Sports</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Entertainment</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">Technology</a>
              </li>
            </ul>
          </div>
          
          <NewsletterSignup />
        </div>
        
        <Separator className="my-8 bg-navy-lighter" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© - Rede TVI</p>
          
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
              
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;

import React from 'react';

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

const SiteLinksBar = () => {
  return (
    <div className="bg-gray-200 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Links da esquerda */}
          <div className="flex space-x-6">
            {siteLinks.slice(0, 2).map(link => (
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

          {/* Logo centralizado */}
          <div className="flex-1 flex justify-center">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Portal <span className="text-primary">TVI</span>
            </a>
          </div>

          {/* Links da direita */}
          <div className="flex space-x-6">
            {siteLinks.slice(2).map(link => (
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
    </div>
  );
};

export default SiteLinksBar;

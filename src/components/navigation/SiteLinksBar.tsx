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
  return <div className="bg-gray-200 py-1">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {siteLinks.map(link => <a key={link.name} href={link.href} style={{
          color: link.color
        }} className="text-xs font-medium lowercase hover:opacity-80 transition-opacity">
              {link.name}
            </a>)}
        </div>
      </div>
    </div>;
};
export default SiteLinksBar;

import React, { useState, useEffect } from 'react';
import SiteLinksBar from './SiteLinksBar';
import MainHeader from './MainHeader';

const Header = () => {
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
    <header>
      <SiteLinksBar />
      <MainHeader isScrolled={isScrolled} />
    </header>
  );
};

export default Header;

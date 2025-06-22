
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import NewsGrid from '@/components/NewsGrid';
import NewsModal from '@/components/NewsModal';
import Footer from '@/components/Footer';

// Mock data for news sections
const generalNews = [
  {
    id: 1,
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions',
    excerpt: 'World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030, marking a turning point in global climate policy.',
    imageUrl: 'https://images.unsplash.com/photo-1626050954744-92bf034ce476?q=80&w=2048',
    category: 'Politics',
    date: 'May 1, 2025'
  },
  {
    id: 2,
    title: 'Tech Giants Face New Regulations on Data Privacy',
    excerpt: 'Major technology companies are preparing for stricter regulations on user data collection and processing after new legislation was passed.',
    imageUrl: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070',
    category: 'Technology',
    date: 'April 30, 2025'
  },
  {
    id: 3,
    title: 'Economic Growth Surges in First Quarter of 2025',
    excerpt: 'The global economy shows signs of robust recovery with a 4.2% growth in the first quarter, exceeding economist predictions.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070',
    category: 'Economy',
    date: 'April 28, 2025'
  }
];

const sportsNews = [
  {
    id: 4,
    title: 'National Team Advances to World Cup Semi-Finals',
    excerpt: 'In a thrilling match that went to penalties, the national team secured their place in the World Cup semi-finals for the first time in 24 years.',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2073',
    category: 'Football',
    date: 'May 2, 2025'
  },
  {
    id: 5,
    title: 'Rising Tennis Star Wins First Major Tournament',
    excerpt: 'At just 19 years old, the tennis prodigy has claimed their first major title after a straight-sets victory in the final round.',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2060',
    category: 'Tennis',
    date: 'April 29, 2025'
  },
  {
    id: 6,
    title: 'NBA Playoffs: Underdogs Shock Defending Champions',
    excerpt: 'In what analysts are calling the biggest upset in recent basketball history, the eighth-seeded team eliminated the defending champions in a seven-game series.',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069',
    category: 'Basketball',
    date: 'April 27, 2025'
  }
];

const entertainmentNews = [
  {
    id: 7,
    title: 'Award-Winning Director Announces Groundbreaking New Film Project',
    excerpt: 'The acclaimed filmmaker has revealed details about an innovative new project that will push the boundaries of cinema technology and storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059',
    category: 'Movies',
    date: 'May 1, 2025'
  },
  {
    id: 8,
    title: 'Music Festival Season Kicks Off With Record Attendance',
    excerpt: 'The summer music festival season has begun with a bang as attendance numbers for the opening weekend reached an all-time high.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
    category: 'Music',
    date: 'April 30, 2025'
  },
  {
    id: 9,
    title: 'Streaming Platform Announces New Original Series With All-Star Cast',
    excerpt: 'A major streaming service has greenlit a high-budget original series featuring some of Hollywood\'s biggest names, set to premiere this fall.',
    imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=2071',
    category: 'Television',
    date: 'April 28, 2025'
  }
];

const Index = () => {
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  const heroNews = {
    title: "Breakthrough Discovery in Renewable Energy Technology Promises Sustainable Future",
    content: "Scientists have developed a revolutionary new energy storage system that could make renewable energy sources like solar and wind power more efficient and accessible worldwide.\n\nThis groundbreaking technology represents a major leap forward in our ability to store and distribute clean energy on a massive scale. The new system addresses one of the most significant challenges facing renewable energy adoption: the intermittent nature of solar and wind power.\n\nResearchers at leading universities and technology companies have collaborated on this project for over five years, investing millions of dollars in research and development. The breakthrough came when they discovered a new method for creating ultra-efficient battery cells that can store energy for extended periods without significant degradation.\n\nThe implications of this discovery extend far beyond just energy storage. It could accelerate the global transition to renewable energy, reduce dependence on fossil fuels, and help combat climate change on an unprecedented scale.\n\nIndustry experts predict that this technology could be commercially available within the next three to five years, potentially revolutionizing how we generate, store, and consume energy worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069",
    category: "Breaking News",
    date: "Hoje"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="mb-12">
            <div 
              className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setIsHeroModalOpen(true)}
            >
              <img 
                src={heroNews.imageUrl}
                alt={heroNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:max-w-3xl">
                  <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded-full mb-3">
                    {heroNews.category}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                    {heroNews.title}
                  </h1>
                  <p className="text-gray-200 mb-4 line-clamp-3">
                    Scientists have developed a revolutionary new energy storage system that could make renewable energy sources like solar and wind power more efficient and accessible worldwide.
                  </p>
                  <span className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors">
                    Ler História Completa
                  </span>
                </div>
              </div>
            </div>
          </section>
          
          {/* News Sections */}
          <NewsGrid title="Notícias Gerais" news={generalNews} />
          <NewsGrid title="Esportes" news={sportsNews} />
          <NewsGrid title="Entretenimento" news={entertainmentNews} />
        </div>
      </main>
      
      <Footer />

      {/* Hero News Modal */}
      <NewsModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        title={heroNews.title}
        content={heroNews.content}
        imageUrl={heroNews.imageUrl}
        category={heroNews.category}
        date={heroNews.date}
      />
    </div>
  );
};

export default Index;

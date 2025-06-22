
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data - em uma aplicação real, isso viria de uma API
const allNews = [
  {
    id: 1,
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions',
    excerpt: 'World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030, marking a turning point in global climate policy.',
    content: 'World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030, marking a turning point in global climate policy.\n\nThis historic agreement represents years of intense negotiations and diplomatic efforts. The summit, held over five days, brought together representatives from 195 countries to address the growing climate crisis.\n\nThe agreement includes specific targets for renewable energy adoption, with countries committing to transition at least 70% of their energy infrastructure to renewable sources by 2035. Additionally, a global fund of $500 billion has been established to support developing nations in their transition to clean energy.\n\nExperts are calling this the most significant climate agreement since the Paris Climate Accord. The implementation will begin immediately, with quarterly progress reports required from all participating nations.\n\nEnvironmental groups have praised the agreement while noting that success will depend on rigorous enforcement and accountability measures.',
    imageUrl: 'https://images.unsplash.com/photo-1626050954744-92bf034ce476?q=80&w=2048',
    category: 'Politics',
    date: 'May 1, 2025'
  },
  {
    id: 2,
    title: 'Tech Giants Face New Regulations on Data Privacy',
    excerpt: 'Major technology companies are preparing for stricter regulations on user data collection and processing after new legislation was passed.',
    content: 'Major technology companies are preparing for stricter regulations on user data collection and processing after new legislation was passed.\n\nThe new Digital Privacy Protection Act introduces comprehensive requirements for how companies handle user data. Tech giants like Google, Facebook, and Amazon will need to completely overhaul their data collection practices within the next 18 months.\n\nKey provisions include mandatory user consent for all data collection, the right to complete data deletion, and transparency requirements for algorithmic decision-making. Companies face fines of up to 4% of global revenue for violations.\n\nIndustry leaders have expressed mixed reactions, with some viewing it as necessary consumer protection while others warn of potential innovation slowdowns. Several companies have already announced significant investments in privacy infrastructure to ensure compliance.\n\nThe legislation is expected to serve as a model for similar regulations worldwide, potentially reshaping the global digital landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070',
    category: 'Technology',
    date: 'April 30, 2025'
  },
  {
    id: 3,
    title: 'Economic Growth Surges in First Quarter of 2025',
    excerpt: 'The global economy shows signs of robust recovery with a 4.2% growth in the first quarter, exceeding economist predictions.',
    content: 'The global economy shows signs of robust recovery with a 4.2% growth in the first quarter, exceeding economist predictions.\n\nThis remarkable growth represents the strongest quarterly performance in over a decade. The recovery has been driven by increased consumer spending, robust business investment, and strategic government policies implemented over the past year.\n\nKey sectors contributing to this growth include technology, renewable energy, and healthcare. The technology sector alone saw a 12% increase, while renewable energy investments doubled compared to the same period last year.\n\nUnemployment rates have fallen to historic lows in many developed countries, with job creation exceeding expectations across multiple industries. Inflation remains controlled despite the rapid growth, thanks to improved supply chain efficiency and strategic monetary policies.\n\nEconomists are optimistic about sustaining this growth trajectory, though they caution about potential challenges from geopolitical tensions and climate-related disruptions.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070',
    category: 'Economy',
    date: 'April 28, 2025'
  },
  {
    id: 4,
    title: 'National Team Advances to World Cup Semi-Finals',
    excerpt: 'In a thrilling match that went to penalties, the national team secured their place in the World Cup semi-finals for the first time in 24 years.',
    content: 'In a thrilling match that went to penalties, the national team secured their place in the World Cup semi-finals for the first time in 24 years.\n\nThe match was a masterpiece of tactical football, with both teams creating numerous chances throughout the 90 minutes and extra time. The breakthrough moment came when our star midfielder scored a spectacular goal from 25 yards, bringing the stadium to its feet.\n\nThe penalty shootout was nerve-wracking, with each team scoring their first four penalties. The decisive moment came when our goalkeeper made a crucial save, followed by the winning penalty that sent the entire nation into celebration.\n\nThis historic achievement marks the end of a 24-year wait since the team last reached the World Cup semi-finals. The victory is particularly sweet given the team\'s journey through adversity, including key player injuries and challenging group stage matches.\n\nThe semi-final match is scheduled for next Tuesday, and ticket demand has reached unprecedented levels as the nation rallies behind their heroes.',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2073',
    category: 'Football',
    date: 'May 2, 2025'
  },
  {
    id: 5,
    title: 'Rising Tennis Star Wins First Major Tournament',
    excerpt: 'At just 19 years old, the tennis prodigy has claimed their first major title after a straight-sets victory in the final round.',
    content: 'At just 19 years old, the tennis prodigy has claimed their first major title after a straight-sets victory in the final round.\n\nThe young champion\'s journey to this moment has been nothing short of extraordinary. Starting tennis at age 5, they quickly rose through junior rankings and turned professional just two years ago. This victory represents the culmination of years of dedication and sacrifice.\n\nThe final match showcased incredible mental fortitude and technical skill. Despite facing a former world number one, our champion never showed signs of nerves, executing perfect shots under pressure and maintaining composure throughout the three-set victory.\n\nThis win not only secures their first major title but also propels them into the top 10 world rankings for the first time. Tennis experts are already predicting a bright future, with many comparing their playing style to legends of the sport.\n\nThe victory comes with a prize of $2.5 million and guarantees entry into all major tournaments for the next two years.',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2060',
    category: 'Tennis',
    date: 'April 29, 2025'
  },
  {
    id: 6,
    title: 'NBA Playoffs: Underdogs Shock Defending Champions',
    excerpt: 'In what analysts are calling the biggest upset in recent basketball history, the eighth-seeded team eliminated the defending champions in a seven-game series.',
    content: 'In what analysts are calling the biggest upset in recent basketball history, the eighth-seeded team eliminated the defending champions in a seven-game series.\n\nThis incredible upset story began when the eighth-seeded team barely made it into the playoffs. No one gave them a chance against the defending champions, who had dominated the regular season with a 65-17 record.\n\nThe series was a rollercoaster of emotions, with each game decided by single digits. The turning point came in Game 5 when the underdogs\' rookie point guard scored 35 points, including the game-winning three-pointer with 2.3 seconds remaining.\n\nGame 7 was played in front of a stunned home crowd as the underdogs built a 20-point lead in the third quarter. The defending champions mounted a furious comeback, but fell short by just three points in one of the most dramatic finishes in playoff history.\n\nThis victory not only eliminates the favorites but also guarantees the underdogs a spot in the conference finals, where they\'ll face another formidable opponent.',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069',
    category: 'Basketball',
    date: 'April 27, 2025'
  },
  {
    id: 7,
    title: 'Award-Winning Director Announces Groundbreaking New Film Project',
    excerpt: 'The acclaimed filmmaker has revealed details about an innovative new project that will push the boundaries of cinema technology and storytelling.',
    content: 'The acclaimed filmmaker has revealed details about an innovative new project that will push the boundaries of cinema technology and storytelling.\n\nThis ambitious project combines traditional filmmaking with cutting-edge virtual reality and artificial intelligence technologies. The director, known for previous award-winning films, describes it as "a completely immersive narrative experience that will redefine how we consume stories."\n\nThe film will be shot using revolutionary camera technology that captures 360-degree footage at unprecedented resolution. Viewers will be able to experience the story from multiple perspectives, making choices that influence the narrative outcome.\n\nProduction begins next month with a budget exceeding $200 million, making it one of the most expensive independent films ever made. The star-studded cast includes several A-list actors who have committed to the experimental format.\n\nThe release is planned for next year, with specialized theaters being constructed worldwide to accommodate the unique viewing experience.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059',
    category: 'Movies',
    date: 'May 1, 2025'
  },
  {
    id: 8,
    title: 'Music Festival Season Kicks Off With Record Attendance',
    excerpt: 'The summer music festival season has begun with a bang as attendance numbers for the opening weekend reached an all-time high.',
    content: 'The summer music festival season has begun with a bang as attendance numbers for the opening weekend reached an all-time high.\n\nOver 300,000 music fans gathered for the three-day festival, surpassing all previous attendance records. The event featured headliners from various genres, including pop superstars, indie bands, and electronic music pioneers.\n\nThe festival\'s success can be attributed to its diverse lineup and improved infrastructure. New stages were added this year, along with enhanced sound systems and more food and beverage options. Sustainability efforts also played a major role, with the event achieving carbon neutrality for the first time.\n\nSocial media buzz around the festival reached unprecedented levels, with millions of posts and stories shared across platforms. Several performances went viral, particularly an surprise collaboration between two major artists that wasn\'t announced beforehand.\n\nTicket sales for upcoming festivals in the series have already exceeded expectations, suggesting this could be the biggest music festival season in history.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
    category: 'Music',
    date: 'April 30, 2025'
  },
  {
    id: 9,
    title: 'Streaming Platform Announces New Original Series With All-Star Cast',
    excerpt: 'A major streaming service has greenlit a high-budget original series featuring some of Hollywood\'s biggest names, set to premiere this fall.',
    content: 'A major streaming service has greenlit a high-budget original series featuring some of Hollywood\'s biggest names, set to premiere this fall.\n\nThe series, titled "Digital Dynasty," is a tech thriller that explores the dark side of social media and artificial intelligence. With a production budget of $150 million for the first season, it represents one of the largest investments in original content by the platform.\n\nThe all-star cast includes Academy Award winners, Emmy recipients, and rising stars from both film and television. The series is created by the team behind several successful thriller series, ensuring high production values and compelling storytelling.\n\nFilming begins next month in locations across Silicon Valley, New York, and London. The series will consist of 10 episodes, each running approximately 60 minutes. Early script reviews from industry insiders have generated significant buzz about the show\'s potential.\n\nThe streaming platform expects this series to compete directly with other high-profile productions and attract millions of new subscribers.',
    imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=2071',
    category: 'Television',
    date: 'April 28, 2025'
  },
  {
    id: 'hero',
    title: "Breakthrough Discovery in Renewable Energy Technology Promises Sustainable Future",
    content: "Scientists have developed a revolutionary new energy storage system that could make renewable energy sources like solar and wind power more efficient and accessible worldwide.\n\nThis groundbreaking technology represents a major leap forward in our ability to store and distribute clean energy on a massive scale. The new system addresses one of the most significant challenges facing renewable energy adoption: the intermittent nature of solar and wind power.\n\nResearchers at leading universities and technology companies have collaborated on this project for over five years, investing millions of dollars in research and development. The breakthrough came when they discovered a new method for creating ultra-efficient battery cells that can store energy for extended periods without significant degradation.\n\nThe implications of this discovery extend far beyond just energy storage. It could accelerate the global transition to renewable energy, reduce dependence on fossil fuels, and help combat climate change on an unprecedented scale.\n\nIndustry experts predict that this technology could be commercially available within the next three to five years, potentially revolutionizing how we generate, store, and consume energy worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069",
    category: "Breaking News",
    date: "Hoje"
  }
];

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = allNews.find(item => item.id.toString() === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Post não encontrado</h1>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
          
          <article className="max-w-4xl mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {post.content}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostPage;

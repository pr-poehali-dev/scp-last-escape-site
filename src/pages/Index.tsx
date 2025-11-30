import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/sections/HeroSection';
import ServerStatsSection from '@/components/sections/ServerStatsSection';
import ContentSections from '@/components/sections/ContentSections';
import FooterSections from '@/components/sections/FooterSections';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [serverStats, setServerStats] = useState({
    online: false,
    players: 0,
    max_players: 60,
    name: 'SCP FOUNDATION: LAST ESCAPE',
    map: 'Загрузка...',
    game: 'Garry\'s Mod',
    rank: 0,
    total_servers: 0,
    country_rank: 0,
    description: ''
  });
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');

  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/48af38e3-4215-4cd0-8a1b-07e48e65fee3');
        const data = await response.json();
        setServerStats(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to fetch server stats:', error);
      }
    };

    fetchServerStats();
    const interval = setInterval(fetchServerStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      if (!lastUpdate) return;
      
      const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);
      
      if (seconds < 60) {
        setTimeSinceUpdate(`Обновлено ${seconds} сек назад`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeSinceUpdate(`Обновлено ${minutes} мин назад`);
      } else {
        setTimeSinceUpdate('Обновлено давно');
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [lastUpdate]);

  const leaderboardData = [
    { rank: 1, name: 'Dr. Bright', score: 15420, status: 'online' },
    { rank: 2, name: 'Agent_47', score: 14890, status: 'online' },
    { rank: 3, name: 'Researcher_Nine', score: 13765, status: 'offline' },
    { rank: 4, name: 'MTF_Commander', score: 12340, status: 'online' },
    { rank: 5, name: 'D_Class_013', score: 11220, status: 'offline' },
  ];

  const newsData = [
    {
      id: 1,
      title: 'Новое обновление: SCP-173 переработан',
      date: '01.12.2025',
      category: 'Обновление',
      content: 'Механика взаимодействия с SCP-173 полностью переработана для более тактического геймплея.',
    },
    {
      id: 2,
      title: 'Событие: Нарушение Режима',
      date: '28.11.2025',
      category: 'Событие',
      content: 'Специальное событие этой недели - массовый побег D-класса. Удвоенный опыт для охранников!',
    },
    {
      id: 3,
      title: 'Обновление карты: Зона-9',
      date: '25.11.2025',
      category: 'Карта',
      content: 'Добавлена новая зона содержания с уникальными SCP-объектами.',
    },
  ];

  const forumTopics = [
    { id: 1, title: 'Гайд по выживанию D-класса', author: 'Survivor_Pro', replies: 234, views: 5620 },
    { id: 2, title: 'Лучшие тактики МОГ Epsilon-11', author: 'TacticalGenius', replies: 156, views: 3890 },
    { id: 3, title: 'Обсуждение баланса SCP-096', author: 'GameDesigner', replies: 89, views: 2340 },
    { id: 4, title: 'Предложения по новым SCP', author: 'Creative_Mind', replies: 312, views: 7120 },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-primary w-8 h-8 glow" />
              <h1 className="text-2xl font-bold glitch">SCP FOUNDATION</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => scrollToSection('main')} className="hover:text-primary transition-colors">
                Главная
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors">
                Правила
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('stats')} className="hover:text-primary transition-colors">
                Статистика
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">
                О сервере
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('leaderboard')} className="hover:text-primary transition-colors">
                Лидерборд
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('community')} className="hover:text-primary transition-colors">
                Сообщество
              </Button>
              <Button onClick={() => scrollToSection('register')} className="glow">
                Войти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection scrollToSection={scrollToSection} />
      
      <ServerStatsSection serverStats={serverStats} timeSinceUpdate={timeSinceUpdate} />
      
      <ContentSections 
        serverStats={serverStats}
        leaderboardData={leaderboardData}
        newsData={newsData}
        forumTopics={forumTopics}
      />
      
      <FooterSections />
    </div>
  );
};

export default Index;

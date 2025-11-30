import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

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

      <section id="main" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <Badge variant="destructive" className="text-lg px-4 py-2 glow">
              ⚠️ LEVEL 4 CLEARANCE REQUIRED
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold glow-text glitch">
              LAST ESCAPE
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Добро пожаловать в закрытый объект SCP Foundation. 
              Выживи, сдержи, защити. Или попытайся сбежать.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Button size="lg" className="text-lg glow" onClick={() => scrollToSection('register')}>
                <Icon name="UserPlus" className="mr-2" />
                Присоединиться
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Icon name="Play" className="mr-2" />
                IP: 194.93.2.148:27015
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold glow-text">Статистика сервера</h2>
            {timeSinceUpdate && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                <Icon name="RefreshCw" className="w-3 h-3" />
                {timeSinceUpdate}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-primary" />
                  Онлайн
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{serverStats.players}/{serverStats.max_players}</p>
                <p className="text-sm text-muted-foreground mt-2">игроков на сервере</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-primary" />
                  Статус
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-4xl font-bold ${serverStats.online ? 'text-green-500' : 'text-red-500'}`}>
                  {serverStats.online ? 'ONLINE' : 'OFFLINE'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{serverStats.online ? 'сервер работает' : 'сервер недоступен'}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" className="text-primary" />
                  Карта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary truncate">{serverStats.map}</p>
                <p className="text-sm text-muted-foreground mt-2">текущая карта</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" className="text-primary" />
                  Рейтинг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {serverStats.rank > 0 ? `#${serverStats.rank}` : '—'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {serverStats.total_servers > 0 ? `из ${serverStats.total_servers} серверов` : 'загрузка...'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="rules" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">Правила сервера</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all">
              <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                1. Основные правила поведения
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                <p>• Запрещены оскорбления, мат в адрес игроков и администрации</p>
                <p>• Уважайте других игроков и соблюдайте игровой процесс</p>
                <p>• Запрещена реклама сторонних серверов и услуг</p>
                <p>• Использование читов и багов карается перманентным баном</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all">
              <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                2. Игровой процесс
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                <p>• Тимкилл разрешен только в рамках ролевой игры</p>
                <p>• D-класс может восстать против охраны при наличии оружия</p>
                <p>• Ученые и охрана должны работать вместе для эвакуации</p>
                <p>• SCP-объекты играют за свою команду и уничтожают людей</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all">
              <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                3. Микрофон и голосовой чат
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                <p>• Спам в голосовом чате запрещен (музыка, крики, шум)</p>
                <p>• Радио используется только для командной коммуникации</p>
                <p>• За нарушения выдается мут на 30-60 минут</p>
                <p>• Повторные нарушения ведут к кику с сервера</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all">
              <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                4. Взаимодействие с администрацией
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                <p>• Решения администрации окончательны и обжалованию не подлежат</p>
                <p>• Жалобы принимаются через Discord или форум на сайте</p>
                <p>• Ложные жалобы на игроков караются предупреждением</p>
                <p>• Администраторы имеют право выдавать наказания по своему усмотрению</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-primary/20 rounded-lg px-6 hover:border-primary/50 transition-all">
              <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                5. Система наказаний
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                <p>• Предупреждение → Мут 30 мин → Кик → Бан 1 день → Бан 7 дней → Перм бан</p>
                <p>• За читы сразу перманентный бан без возможности разбана</p>
                <p>• За токсичность бан от 1 до 30 дней в зависимости от тяжести</p>
                <p>• Обжалование бана через Discord в течение 7 дней</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">О сервере</h2>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Info" className="text-primary" />
                {serverStats.name}
              </CardTitle>
              <CardDescription className="text-base">
                {serverStats.description || 'Проект создан в 2024 году энтузиастами вселенной SCP'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">🎮 Концепция игры</h3>
                <p>
                  Last Escape — это уникальный сервер Garry's Mod, основанный на вселенной SCP Foundation. 
                  Игроки могут играть за различные роли: D-класс персонал, ученых, охранников, 
                  мобильные оперативные группы или самих SCP-объектов.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">🎯 Игровые режимы</h3>
                <ul className="space-y-2">
                  <li>• <strong>Breach Mode:</strong> Массовый побег SCP-объектов из содержания</li>
                  <li>• <strong>Escape Mode:</strong> D-класс пытается сбежать из комплекса</li>
                  <li>• <strong>Lockdown Mode:</strong> МОГ удерживает позиции против волн SCP</li>
                  <li>• <strong>RP Mode:</strong> Свободная ролевая игра внутри объекта</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">⚡ Особенности</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>15+ уникальных SCP-объектов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>Кастомные модели и анимации</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>Система прогресса и рангов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>Ежедневные события и квесты</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>Голосовой чат с 3D-звуком</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" />
                    <span>Стабильная работа 24/7</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">👥 Команда проекта</h3>
                <p>
                  Над сервером работает команда из 8 человек: администраторы, разработчики, 
                  модераторы и дизайнеры. Мы постоянно обновляем контент и улучшаем баланс игры.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="leaderboard" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">Лидерборд</h2>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" className="text-primary" />
                Топ игроков месяца
              </CardTitle>
              <CardDescription>Рейтинг основан на очках опыта и времени игры</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary w-8">#{player.rank}</div>
                      <div>
                        <p className="font-semibold text-lg">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.score} XP</p>
                      </div>
                    </div>
                    <Badge variant={player.status === 'online' ? 'default' : 'secondary'} className={player.status === 'online' ? 'glow' : ''}>
                      {player.status === 'online' ? '🟢 Онлайн' : '⚫ Оффлайн'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="community" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">Сообщество</h2>
          
          <Tabs defaultValue="news" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="news">Новости</TabsTrigger>
              <TabsTrigger value="forum">Форум</TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.map((news) => (
                  <Card key={news.id} className="border-primary/20 hover:border-primary/50 transition-all hover:glow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{news.category}</Badge>
                        <span className="text-xs text-muted-foreground">{news.date}</span>
                      </div>
                      <CardTitle className="text-xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{news.content}</p>
                      <Button variant="ghost" className="mt-4 w-full hover:text-primary">
                        Читать далее
                        <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forum" className="space-y-4">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="border-primary/20 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Автор: <span className="text-foreground">{topic.author}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-6 ml-6">
                        <div className="text-center">
                          <Icon name="MessageSquare" className="text-primary mx-auto mb-1" />
                          <p className="text-sm font-semibold">{topic.replies}</p>
                        </div>
                        <div className="text-center">
                          <Icon name="Eye" className="text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">{topic.views}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="register" className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-primary/20 glow">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Регистрация</CardTitle>
              <CardDescription className="text-center">
                Создайте аккаунт для доступа ко всем функциям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input id="username" placeholder="Введите никнейм" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="••••••••" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="steamid">Steam ID (опционально)</Label>
                <Input id="steamid" placeholder="STEAM_0:0:12345678" className="bg-secondary" />
              </div>
              <Button className="w-full glow" size="lg">
                <Icon name="UserPlus" className="mr-2" />
                Зарегистрироваться
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <Button variant="link" className="text-primary p-0 h-auto">
                  Войти
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12 glow-text">Контакты и связь</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="MessageCircle" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Discord</h3>
                <p className="text-muted-foreground">discord.gg/secure-contain-protect</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="Send" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Telegram</h3>
                <p className="text-muted-foreground">t.me/scplast_official</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-all hover:glow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                <Icon name="Mail" className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">admin@scplast.ru</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-4">
            © 2025 SCP Foundation: Last Escape. Все права защищены.
          </p>
          <p className="text-sm">
            Данный проект является фан-работой и не связан с официальным SCP Foundation.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Icon name="Shield" className="text-primary w-5 h-5" />
            <span className="text-xs">SECURE. CONTAIN. PROTECT.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
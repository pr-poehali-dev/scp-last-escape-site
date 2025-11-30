import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface ServerStats {
  name: string;
  description: string;
}

interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
  status: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
}

interface ContentSectionsProps {
  serverStats: ServerStats;
  leaderboardData: LeaderboardPlayer[];
  newsData: NewsItem[];
  forumTopics: ForumTopic[];
}

const ContentSections = ({ serverStats, leaderboardData, newsData, forumTopics }: ContentSectionsProps) => {
  return (
    <>
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
    </>
  );
};

export default ContentSections;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ServerStats {
  online: boolean;
  players: number;
  max_players: number;
  name: string;
  map: string;
  game: string;
  rank: number;
  total_servers: number;
  country_rank: number;
  description: string;
}

interface ServerStatsSectionProps {
  serverStats: ServerStats;
  timeSinceUpdate: string;
}

const ServerStatsSection = ({ serverStats, timeSinceUpdate }: ServerStatsSectionProps) => {
  return (
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
  );
};

export default ServerStatsSection;
